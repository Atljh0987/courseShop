import { Button, Form, Input, Modal, Popconfirm, Select, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersActions } from '../../../actions/AdminActions';
import _ from 'lodash';

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
  const [visibleEdit, setVisibleEdit] = useState(false)
  const dataSource = useSelector((state) => state.usersData.data)
  
  useEffect(() => {
    dispatch(usersActions('getAll'))
  }, [dispatch])

  const handleDelete = (key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

  // const confirmedEdit = () => {
  //   if(userToEdit.key) {
  //     dispatch(usersActions('editUser', userToEdit))
  //   }
    
  //   setVisibleEdit(false)
  // }

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
            width: 120,
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

  const handleAdd = () => {
    console.log(13123)
  };

  const saveChanges = (row) => {
    // console.log(row)
    dispatch(usersActions('saveEdited', row))
    // const previous = dataSource.filter(e => e.key === row.key)[0]
    // return _.isEqual(row, previous)
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

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
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