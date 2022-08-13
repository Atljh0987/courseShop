import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import MainContent from "../MainContent/MainContent";
import MainFooter from "../MainFooter/MainFooter";
import MainHeader from "../MainHeader/MainHeader";

const MainPage = () => {
  return <Layout style={{minHeight: "100vh"}}>
    <MainHeader/>
    <MainContent/>
    <MainFooter/>
  </Layout>;
};

export default MainPage;
