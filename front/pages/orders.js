import { message } from "antd";
import "antd/dist/antd.css";
import Layout from "antd/lib/layout/layout";
import MainContent from "../components/MainContent/MainContent";
import MainFooter from "../components/MainFooter/MainFooter";
import MainHeader from "../components/MainHeader/MainHeader";
import { server } from "../config";

// export async function getServerSideProps() {
//   try {
//     const res = await fetch(server.back + '/api/orders')
//     const data = await res.json()
//     return { props: { data } }
//   } catch(err) {
//     console.log(err)
//     message.error(err.message)
//     return { props: { data: []} }
//   }  
// }

const Orders = () => {  
  return <h1>Заказы</h1>
}

export default Orders
