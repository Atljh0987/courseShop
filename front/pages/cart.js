import { Button, Image, InputNumber, message, Table } from "antd"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountAction } from "../actions/MaterialsActions"
import MainHeader from "../components/MainHeader/MainHeader"
import { server } from "../config"

export async function getServerSideProps({req}) {
  
  try {
    const access = await axios.get(server.back + '/api/cart', {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    })

    const hasAccess = access.data.hasAccess

    const user = await axios.get(server.back + '/api/auth/check', {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    })

    const userId = user.data.userId
  
    const res = await axios.post(server.back + '/api/cart/user', {}, {
        withCredentials: true,
        headers: {
          "userId": userId,
          Cookie: req.headers.cookie
        }
    })
    const data = res.data

    if(hasAccess) {
      return { props: { success: true, data } }
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }    
  } catch(err) {
    console.log(err)
    return { props: { success: false, data: []} }
  }  
}

const Cart = ({data}) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.userId)
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(data.map(e => {
      return {
        key: e.id,
        image: server.back + '/api/photo/' + e.material.photo.filter(p => p.mainPhoto === 1)[0].image,
        name: e.material.name,
        count: e.count,
        sum: e.material.price * e.count,
        price: e.material.price,
        link: server.back + '/material/' + e.material.id
      }
    }))
  }, [useState])

  const changeCount = async (value, record) => {
    const params = new URLSearchParams();
    params.append("count", value)
    

    await axios.put(server.back + '/api/cart/count/' + record.key,  params)

    const res = await axios.post(server.back + '/api/cart/user',{}, {
      withCredentials: true,
      headers: {
        "userId": userId
        }
    })
    const data = res.data

    dispatch(getCountAction())

    setDataSource(data.map(e => {
      return {
        key: e.id,
        image: server.back + '/api/photo/' + e.material.photo.filter(p => p.mainPhoto === 1)[0].image,
        name: e.material.name,
        maxCount: e.material.count,
        count: e.count,
        sum: e.material.price * e.count,
        price: e.material.price,
        link: server.back + '/material/' + e.material.id
      }
    }))
  }

  const deletePosition = (id) => {
    axios.delete(server.back + '/api/cart/delete/' + id).then(res => {
      if(res.data.success) {
        message.success(res.data.message)
        const index = dataSource.findIndex(e => e.key === id);
        setDataSource(dataSource.filter((e, i) => i !== index))
        dispatch(getCountAction())
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      message.error(err.message)
    })
  }

  const makeAnOrder = () => {
    const params = new URLSearchParams()
    params.append("userId", userId)

    axios.post(server.back + '/api/orders/create/', params).then(res => {
      if(res.data.success) {
        message.success(res.data.message)
        // const index = dataSource.findIndex(e => e.key === id);
        // setDataSource(dataSource.filter((e, i) => i !== index))
        dispatch(getCountAction())
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      message.error(err.message)
    })
  }

  const columns = [
    {
      title: 'Изображение',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => {
        return <div style={{width: "200px", height: "200px", overflow: "hidden"}}><Image src={record.image} /></div>
      }
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <Link href={record.link}>{record.name}</Link>
      }
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      render: (text, record) => {
        return <InputNumber min={1} max={record.maxCount} defaultValue={record.count} onChange={value => changeCount(value, record)}/>
      }
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum'
    },
    {
      title: 'Удалить',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => {
        return <Button onClick={() => deletePosition(record.key)}>Удалить</Button>
      }
    }
  ];  

  return (<div>
    <MainHeader />
    <h1>Корзина</h1>
    <Button onClick={makeAnOrder}>Оформить</Button>
    <Table dataSource={dataSource.sort((a, b) => a.key - b.key)} columns={columns} />
    </div>)
}

export default Cart