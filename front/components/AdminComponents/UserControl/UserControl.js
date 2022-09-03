import { Button, Form, Input, Modal, Popconfirm, Select, Table, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rolesAction, usersActions } from '../../../actions/AdminActions';
import _ from 'lodash';
import axios from 'axios';
import { server } from '../../../config';
import * as types from '../../../types'

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
    // <h1>1231241f</h1>
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

const UserControl = ({data}) => {
  const dispatch = useDispatch()
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const dataSource = useSelector((state) => state.usersData.data)
  const roles = useSelector((state) => state.rolesData.data)

  useEffect(() => {
    dispatch(usersActions('getAll'))
    dispatch(rolesAction(types.GETALLROLES))
  }, [dispatch])

  const handleDelete = (id) => {
    axios.delete(server.back + '/api/users/delete', { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'id': id}}, { withCredentials: true }).then(res => {
      message.success(res.data.message)
      dispatch(usersActions('getAll'))      
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
      title: 'Логин',
      dataIndex: 'username',
      width: '30%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    },
    {
      title: 'Роль',
      dataIndex: 'roles',
      render: (roles, record) => (
        <Select
          defaultValue={record.roleKey}
          style={{
            width: 150,
          }}
          onSelect={(val, opt) => {record.roleSelect = val}}
        >
          {
            roles.map(role => {
              return <Select.Option key= {role.id} value={role.id}>{role.name}</Select.Option>;
            })
          }
        </Select>
      )
    },
    {
      title: 'Статус',
      dataIndex: 'confirmed',
      render: (roles, record) => (
        <Select
          defaultValue={record.confirmed}
          style={{
            width: 150,
          }}
          onSelect={(val, opt) => {record.confirmedSelect = val}}
        >
          <Select.Option key={1} value={1}>Подтвержден</Select.Option>;
          <Select.Option key={0} value={0}>Не подтвержден</Select.Option>;
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
          <Popconfirm title="Удалить пользователя?" onConfirm={() => handleDelete(record.key)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const saveChanges = (user) => {
    const params = new URLSearchParams()
    params.append('id', user.key)
    params.append('username', user.username)
    params.append('email', user.email)
    params.append('role', user.roleSelect)
    params.append('confirmed', user.confirmedSelect)

    axios.put(server.back + '/api/users/edit', params).then(res => {
      if(res.data.successEdit) {
        dispatch(usersActions('saveEdited', user))
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
    dispatch(usersActions('editUser', newData));
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

  const addUser = (user) => {
    setAddLoading(true)
    const params = new URLSearchParams()
    params.append('username', user.username)
    params.append('email', user.email)
    params.append('role', user.role)
    params.append('confirmed', user.confirmed)

    axios.put(server.back + '/api/users/add', params, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }, { withCredentials: true }).then(res => {
      setAddLoading(false)
      dispatch(usersActions('getAll'))
      if(res.data.successRegistration) {
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
        title="Добавить пользователя"
        visible={visibleAdd}
        // onOk={handleOk}
        confirmLoading={addLoading}
        onCancel={() => setVisibleAdd(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisibleAdd(false)}>Отмена</Button>,
          <Button key="submit" type="primary" htmlType="submit" form="addUser">Создать</Button>
        ]}
      >
        <Form
          id="addUser"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={addUser}
          initialValues={{
            role: roles.length >= 1? roles[0].name : "",
            confirmed: 0
          }}
          // onValuesChange={onFormLayoutChange}
          // size={componentSize}
        >
          <Form.Item 
            label="Логин" 
            name="username"
            rules={[
              {
                required: true,
                message: 'Необходимо ввести логин!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Введенная почта некорректна!',
              },
              {
                required: true,
                message: 'Необходимо ввести почту!',
              },
            ]}
          >
          <Input />
        </Form.Item>
          <Form.Item label="Роль" name="role">
            <Select>
              {
                roles.length >= 1 ? (
                  roles.map(role => {
                    return <Select.Option key={role.id} value={role.name}>{role.name}</Select.Option>
                  })
                ) : null
              }
            </Select>
          </Form.Item>
          <Form.Item label="Статус" name="confirmed">
            <Select>
              <Select.Option key={0} value={0}>Не подтвержден</Select.Option>
              <Select.Option key={1} value={1}>Подтвержден</Select.Option>
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
        Добавить пользователя
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

export default UserControl