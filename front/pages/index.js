import "antd/dist/antd.css";
import Layout from "antd/lib/layout/layout";
import MainContent from "../components/MainContent/MainContent";
import MainFooter from "../components/MainFooter/MainFooter";
import MainHeader from "../components/MainHeader/MainHeader";
import { server } from "../config";

export async function getServerSideProps() {
  const res = await fetch(server.back + '/api/materials/all')
  const data = await res.json()

  return { props: { data } }
}

const Index = ({data}) => {  
  return <Layout style={{minHeight: "100vh"}}>
          <MainHeader/>
          <MainContent data={data}/>
          <MainFooter/>
        </Layout>;
}

export default Index
