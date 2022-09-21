import { Button, Image, InputNumber, message, Table } from "antd";
import "antd/dist/antd.css";
import Layout from "antd/lib/layout/layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../../components/MainHeader/MainHeader";

import { server } from "../../config";

export async function getServerSideProps({params, req}) {
  
  try {
    const access = await axios.get(server.back + '/api/orderdetail', {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie
        }
    })
    const hasAccess = access.data.hasAccess
  
    const res = await axios.get(server.back + '/api/orderdetail/' + params.id, {}, {
        withCredentials: true,
        headers: {
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

const OrdersDetails = ({data}) => {
  const dispatch = useDispatch()  
  const control = useSelector((state) => state.auth.confirmed) 
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
      key: 'count'
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum'
    }
  ];  


  return <>
    <MainHeader />
    <h1>Детали заказа</h1>
    <Table dataSource={dataSource} columns={columns} />
  </>
}

export default OrdersDetails