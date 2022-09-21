import { Button, message, Table } from "antd";
import "antd/dist/antd.css";
import Layout from "antd/lib/layout/layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, openConfirmedModal } from "../actions/AuthAction";
import MainContent from "../components/MainContent/MainContent";
import MainFooter from "../components/MainFooter/MainFooter";
import MainHeader from "../components/MainHeader/MainHeader";
import { server } from "../config";

export async function getServerSideProps({req}) {
  
  try {
    const access = await axios.get(server.back + '/api/orders', {
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
  
    const res = await axios.post(server.back + '/api/orders/get/' + userId, {}, {
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

const Orders = ({data}) => {
  const dispatch = useDispatch()  
  const control = useSelector((state) => state.auth.confirmed) 
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(data.map(e => {
      return {
        key: e.id,
        status: e.orderStatus.name
      }
    }))
  }, [dispatch, useState])

  const changeStatus = (id) => {
    const params = new URLSearchParams()
    params.append("orderId", id)

    axios.post(server.back + '/api/orders/disableorder', params).then(res => {
      message.success("Заказ успешно отменен")
    }).catch(err => {
      message.error(err.message)
    })
  }

  const columns = [
    {
      title: 'Номер заказа',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Детали заказа',
      dataIndex: 'details',
      key: 'details',
      render: (text, record) => {
        return <Link href={server.back + "/orderdetail/" + record.key}> Детали заказа </Link>
      }
    },
    {
      title: 'Отменить',
      dataIndex: 'abort',
      key: 'abort',
      render: (text, record) => {
        return (record.status !== 'Отменено')? <Button onClick={() => changeStatus(record.key)}>Отменить</Button> : null
      }
    }
  ]; 


  return <>
    <MainHeader />
    <h1>Заказы</h1>
    <Table dataSource={dataSource} columns={columns} />
  </>
}

export default Orders
