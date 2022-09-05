import { Button, Form, Input, Modal, Popconfirm, Select, Table, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { server } from '../../../../config';
import * as types from '../../../../types'
import { materialsActions } from '../../../../actions/MaterialsActions';
import { categoriesActions } from '../../../../actions/CategoriesActions';
import { subCategoriesActions } from '../../../../actions/subCategoriesActions';
import TextArea from 'antd/lib/input/TextArea';
const { Option, OptGroup } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} необходимо.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const MaterialsControl = ({data}) => {
  const dispatch = useDispatch()
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const subCategories = useSelector((state) => state.subcategories.data)
  const [subCategoriesAdd, setSubCategoriesAdd] = useState(subCategories)
  const dataSource = useSelector((state) => state.materialsAdmin.data)
  const categories = useSelector((state) => state.categories.data)
  const [form] = Form.useForm();
  

  useEffect(() => {
    dispatch(materialsActions('getAll'))
    dispatch(categoriesActions('getAll'))
    dispatch(subCategoriesActions('getAll'))
  }, [dispatch])

  const handleDelete = (id) => {
    axios.delete(server.back + '/api/material/delete', { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'id': id}}, { withCredentials: true }).then(res => {
      if(res.data.successDelete) {
        message.success(res.data.message)
        dispatch(materialsActions('getAll'))  
      } else {
        message.error(res.data.message)
      }          
    }).catch(err => {
      message.error(err.message)
    })
  }

  const defaultColumns = [
    {
      title: 'Id',
      dataIndex: 'key'
    },
    {
      title: 'Название',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      width: '30%',
      editable: true,
      render: (_, record) => {return <TextArea value={record.description}/>}
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      width: '30%',
      editable: true,
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      width: '30%',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      render: (_,record, index) => (
        <Select
          defaultValue={record.categories[record.categories.findIndex(e => e.id === record.category)].name}
          style={{
            width: 250,
          }}
          onSelect={(val, opt) => 
            {
              record.categorySelect = val
              categoryClick(val)
            }
          }
        >
          {
            categories.map(category => {
              return <Select.Option key= {category.key} value={category.key}>{category.name}</Select.Option>;
            })            
          }
        </Select>
      )
    },
    {
      title: 'Подкатегория',
      dataIndex: 'subCategory',
      render: (_,record, index) => (
        <Select
          defaultValue={record.subCategoriesConst[record.subCategoriesConst.findIndex(e => e.id === record.subCategory)].name}
          style={{
            width: 250,
          }}
          onSelect={(val, opt) => {record.subCategorySelect = val}}
        >
          {
            record.categories.map(category => {
              return <OptGroup label={category.name}>
                {
                  record.subCategories.filter(e => e.category === category.id).map(subCategory => {
                    return <Option key={subCategory.id} value={subCategory.id}>{subCategory.name}</Option>
                  })
                }
              </OptGroup>
            })
          }
        </Select>
      )
    },
    {
      title: 'Сохранить',
      dataIndex: 'save',
      render: (_, record) =>
      dataSource.length >= 1 ? (
          <Popconfirm title="Сохранить изменения?" disabled={visibleEdit} onConfirm={() => saveChanges(record)}>
            <a>Сохранить</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'Удалить',
      dataIndex: 'delete',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Удалить товар?" onConfirm={() => handleDelete(record.key)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const saveChanges = (material) => {
    const params = new URLSearchParams()
    params.append('id', material.key)
    params.append('name', material.name)
    params.append('category', material.categorySelect)
    params.append('subcategory', material.subCategorySelect)
    params.append('price', material.price)
    params.append('count', material.count)

    axios.put(server.back + '/api/material/edit', params).then(res => {
      if(res.data.successEdit) {
        dispatch(materialsActions('saveEditmaterial', material))
        message.success(res.data.message)
      } else {
        res.data.message.forEach(e => message.warning(e.defaultMessage))
      }
    }).catch(err => {
      message.error(err.message)
    })
  }

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    dispatch(materialsActions('editmaterial', newData));
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const addmaterial = (material) => {
    setAddLoading(true)
    const params = new URLSearchParams()
    params.append('name', material.name)
    params.append('category', material.category)
    params.append('subcategory', material.subcategory)
    params.append('price', Number(material.price))
    params.append('count', Number(material.count))
    params.append('description', material.description)

    axios.put(server.back + '/api/material/add', params, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }, { withCredentials: true }).then(res => {
      setAddLoading(false)
      dispatch(materialsActions('getAll'))
      if(res.data.successSave) {
        message.success(res.data.message)
        setVisibleAdd(false)
      } else {
        if(typeof res.data.message === "string") {
          if(res.data.message.includes("550"))
            message.error("Отправка на этот адрес почты невозможна")
          else
            message.error(res.data.message)
        } else {
          res.data.message.forEach(e => message.warning(e.defaultMessage))
        }
      }      
    }).catch(err => {
      setAddLoading(false)
      message.error(err.message)
    })
  }

  const categoryClick = (id) => {  
    form.resetFields(['subcategory'])  
    setSubCategoriesAdd(subCategories.filter(e => e.category === id))
  }

  return (
    <div>
      <Modal
        title="Добавить товар"
        visible={visibleAdd}
        // onOk={handleOk}
        confirmLoading={addLoading}
        onCancel={() => setVisibleAdd(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisibleAdd(false)}>Отмена</Button>,
          <Button key="submit" type="primary" htmlType="submit" form="addmaterial">Создать</Button>
        ]}
      >
        <Form
          form={form}
          id="addmaterial"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={addmaterial}
        >
          <Form.Item 
            label="Название" 
            name="name"
            rules={[
              {
                required: true,
                message: 'Необходимо ввести название!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Цена" 
            name="price"
            rules={[
              {
                required: true,
                message: 'Необходимо указать цену!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Количество" 
            name="count"
            rules={[
              {
                required: true,
                message: 'Необходимо ввести количество!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Категория" name="category"
            rules={[
              {
                required: true,
                message: 'Необходимо выбрать категорию!',
              },
            ]}
          >
            <Select onSelect={categoryClick}>
              {
                categories.length >= 1 ? (
                  categories.map(category => {
                    return <Select.Option key={category.key} value={category.key}>{category.name}</Select.Option>
                  })
                ) : null
              }
            </Select>
          </Form.Item>
          <Form.Item label="Подкатегория" name="subcategory"
            rules={[
              {
                required: true,
                message: 'Необходимо выбрать подкатегорию!',
              },
            ]}
          >
            <Select>
              {
                subCategoriesAdd.length >= 1 ? (
                  subCategoriesAdd.map(subCategory => {
                    return <Select.Option key={subCategory.key} value={subCategory.key}>{subCategory.name}</Select.Option>
                  })
                ) : null
              }
            </Select>
          </Form.Item>
          <Form.Item 
            label="Описание" 
            name="description"
            rules={[
              {
                required: true,
                message: 'Необходимо описание!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        onClick={() => setVisibleAdd(true)}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Добавить товар
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default MaterialsControl