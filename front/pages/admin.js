import axios from "axios"
import { server } from "../config"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css";
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../css/AdminPage.module.css'
import UserControl from "../components/AdminComponents/UserControl/UserControl";
import { useDispatch, useSelector } from "react-redux";
import CategoriesControl from "../components/AdminComponents/GoodsControl/CategoriesControl/CategoriesContol";
import { pageSwitcher, usersActions, rolesAction } from "../actions/AdminActions";
import Link from "next/link";
const { Header, Content, Footer, Sider } = Layout;
import * as types from '../types'

export async function getServerSideProps({req}) {
  
  try {
    const res = await axios.get(server.back + '/api/admin', {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie
        }
    })
    const data = res.data

    if(data.hasAccess) {
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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function choosePage(page) {
  switch(page) {
    case '/user': return <UserControl/>
    case '/Categories': return <CategoriesControl/>
    default: return <UserControl/>
  }
}

const items = [
  getItem('Пользователи', 'users', <PieChartOutlined />),
  getItem('Товары', 'Categories', <DesktopOutlined />),
];

const Admin = ({data}) => {
  const page = useSelector((state) => state.adminGoToPage.activePage)
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible className={styles.slider} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Link href="/" ><p className={styles.logo}>Назад</p></Link>
        <Menu theme="dark" mode="inline" items={items} onClick={e => dispatch(pageSwitcher(e.key))}/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              margin: '16px 0',
            }}
          >
          </div>
          <div
            className={styles.siteLayoutBackground}
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {
              choosePage(page)
            }            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Admin