import { Button, Form, Input, Modal, Popconfirm, Select, Table, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { server } from '../../../../config';
import * as types from '../../../../types'
import { subCategoriesActions } from '../../../../actions/subCategoriesActions';
import { categoriesActions } from '../../../../actions/CategoriesActions';

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
            message: `${title} is required.`,
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

const SubCategoriesControl = ({data}) => {
  const dispatch = useDispatch()
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const dataSource = useSelector((state) => state.subcategories.data)
  const categories = useSelector((state) => state.categories.data)

  useEffect(() => {
    dispatch(subCategoriesActions('getAll'))
    dispatch(categoriesActions('getAll'))
  }, [dispatch])

  const handleDelete = (id) => {
    axios.delete(server.back + '/api/subcategory/delete', { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'id': id}}, { withCredentials: true }).then(res => {
      if(res.data.successDelete) {
        message.success(res.data.message)
        dispatch(subCategoriesActions('getAll'))  
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
      title: 'Категория',
      dataIndex: 'category',
      render: (res,record) => (
        <Select
          defaultValue={record.categories[record.categories.findIndex(e => e.id === record.category)].name}
          style={{
            width: 250,
          }}
          onSelect={(val, opt) => {record.categorySelect = val}}
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
          <Popconfirm title="Удалить подподкатегорию?" onConfirm={() => handleDelete(record.key)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const saveChanges = (subcategory) => {
    const params = new URLSearchParams()
    params.append('id', subcategory.key)
    params.append('name', subcategory.name)
    params.append('categoryId', subcategory.categorySelect)

    axios.put(server.back + '/api/subcategory/edit', params).then(res => {
      dispatch(subcategoriesActions('saveEditsubcategory', subcategory))
      message.success(res.data.message)
    }).catch(err => {
      message.error(err.message)
    })
  }

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    dispatch(subcategoriesActions('editsubcategory', newData));
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

  const addsubcategory = (subcategory, ewr, rwe ,rew) => {
    setAddLoading(true)
    const params = new URLSearchParams()
    params.append('name', subcategory.name)
    params.append('category', subcategory.category)

    axios.put(server.back + '/api/subcategory/add', params, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }, { withCredentials: true }).then(res => {
      setAddLoading(false)
      dispatch(subCategoriesActions('getAll'))
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

  return (
    <div>
      <Modal
        title="Добавить подкатегорию"
        visible={visibleAdd}
        // onOk={handleOk}
        confirmLoading={addLoading}
        onCancel={() => setVisibleAdd(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisibleAdd(false)}>Отмена</Button>,
          <Button key="submit" type="primary" htmlType="submit" form="addsubcategory">Создать</Button>
        ]}
      >
        <Form
          id="addsubcategory"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={addsubcategory}
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
          <Form.Item label="Категория" name="category"
            rules={[
              {
                required: true,
                message: 'Необходимо выбрать категорию!',
              },
            ]}
          >
            <Select>
              {
                categories.length >= 1 ? (
                  categories.map(category => {
                    return <Select.Option key={category.key} value={category.key}>{category.name}</Select.Option>
                  })
                ) : null
              }
            </Select>
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
        Добавить подкатегорию
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

export default SubCategoriesControl