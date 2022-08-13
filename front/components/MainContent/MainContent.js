import { Content } from "antd/lib/layout/layout";
import { Breadcrumb, Card, Button } from "antd";
import styles from "./MainContent.module.css";
const { Meta } = Card;

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MainContent = () => {
  return (
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.content}>
        {arr.map((e, i) => {
          return <Card
            key={e}
            className={styles.card}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            actions={[<Button type="primary">В корзину</Button>]}
          >
            <Meta title={"Товар " + e} description={<h2>5000 ₽</h2>} />
          </Card>;
        })}
      </div>
    </Content>
  );
};

export default MainContent;
