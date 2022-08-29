import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersActions } from '../../../actions/AdminActions';

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
  const dataSource = useSelector((state) => state.usersData.data)
  
  useEffect(() => {
    dispatch(usersActions('getAll'))
  }, [dispatch])

  // const [dataSource, setDataSource] = useState([
  //   {
  //     key: '0',
  //     name: 'Edward King 0',
  //     age: '32',
  //     address: 'London, Park Lane no. 0',
  //   },
  //   {
  //     key: '1',
  //     name: 'Edward King 1',
  //     age: '32',
  //     address: 'London, Park Lane no. 1',
  //   },
  // ]);
  // const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

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
    },
    {
      title: 'Роль',
      dataIndex: 'role',
    },
    {
      title: 'Статус',
      dataIndex: 'confirmed',
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
    // const newData = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: '32',
    //   address: `London, Park Lane no. ${count}`,
    // };
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
  };

  const handleSave = (row) => {
    console.log(row)
    // const newData = [...dataSource];
    // const index = newData.findIndex((item) => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, { ...item, ...row });
    // setDataSource(newData);
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