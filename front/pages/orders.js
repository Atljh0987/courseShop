import { message } from "antd";
import "antd/dist/antd.css";
import Layout from "antd/lib/layout/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openConfirmedModal } from "../actions/AuthAction";
import MainContent from "../components/MainContent/MainContent";
import MainFooter from "../components/MainFooter/MainFooter";
import MainHeader from "../components/MainHeader/MainHeader";
import { server } from "../config";

export async function getServerSideProps({req}) {
  
  try {
    const res = await axios.get(server.back + '/api/orders', {
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

const Orders = ({data}) => {
  const dispatch = useDispatch()  
  const control = useSelector((state) => {
    return state.auth.confirmed
  }) 
  useEffect(() => {
    if(control === 0)
      dispatch(openConfirmedModal())
  }, [dispatch])

  return <>
    <MainHeader />
    <h1>Заказы</h1>
  </>
}

export default Orders
