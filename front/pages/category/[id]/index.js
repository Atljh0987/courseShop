import { Layout } from "antd";
import "antd/dist/antd.css";
import MainHeader from '../../../components/MainHeader/MainHeader'
import MainContent from '../../../components/MainContent/MainContent'
import MainFooter from '../../../components/MainFooter/MainFooter'
import { server } from "../../../config";

export async function getServerSideProps({ params }) {
  const res = await fetch(server.back + '/api/material/category/' + params.id)
  const data = await res.json()

  return { props: { data } }
}

const CategoryFilter = ({data}) => {
  return (
    <Layout style={{minHeight: "100vh"}}>
      <MainHeader/>
      <MainContent data={data}/>
      <MainFooter/>
    </Layout>
  )
}

export default CategoryFilter