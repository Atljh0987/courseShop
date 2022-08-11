import { Layout, Col, Row } from 'antd';
import 'antd/dist/antd.css';
const { Header, Footer, Sider, Content } = Layout;

export default () => {
  return (
    <Layout>
      <Header>
        <Row>
            <Col span={4}>col</Col>
            <Col span={4} offset={16}>col</Col>
        </Row>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}
