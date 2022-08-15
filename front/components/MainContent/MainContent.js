import { Content } from "antd/lib/layout/layout";
import { Breadcrumb, Card, Button } from "antd";
import styles from "./MainContent.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
const { Meta } = Card;

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MainContent = () => {
  const data = useSelector((state) => state.materials)

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
        {data.map((e, i) => {
          return <Link  href={"/material/" + e.id}><Card
            style={{cursor: "pointer"}}
            key={e.id}
            className={styles.card}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            actions={[<Button type="primary">В корзину</Button>]}
          >
            <Meta title={e.name} description={<h2>{e.price} ₽</h2>} />
          </Card></Link>;
        })}
      </div>
    </Content>
  );
};

export default MainContent;
