import { message } from "antd";
import "antd/dist/antd.css";
import Layout from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainContent from "../components/MainContent/MainContent";
import MainFooter from "../components/MainFooter/MainFooter";
import MainHeader from "../components/MainHeader/MainHeader";
import { server } from "../config";
import { count } from "../reducers/MaterialsReducer";

const Index = () => {
  return <Layout style={{minHeight: "100vh"}}>
          <MainHeader/>
          <MainContent/>
          <MainFooter/>
        </Layout>;
}

export default Index
