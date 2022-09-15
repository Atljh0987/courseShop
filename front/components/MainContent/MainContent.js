import { Content } from "antd/lib/layout/layout";
import { Breadcrumb, Card, Button, message } from "antd";
import styles from "./MainContent.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { firstLoadMaterials } from "../../actions/MaterialsActions";
import { server } from "../../config";
import axios from "axios";
import { openAuthModal } from "../../actions/AuthAction";
const { Meta } = Card;

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MainContent = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.materials)  
  const userId = useSelector(state => state.auth.userId)

  useEffect(() => {
    dispatch(firstLoadMaterials())
  }, [dispatch])

  const addInCart = (id) => {
    const params = new URLSearchParams();
    params.append("material", id)
    params.append("user", userId)

    if(userId) {
      axios.put(server.back + '/api/cart/add',params).then(res => {
        if(res.data.success) {
          message.success(res.data.message)
        } else {
          message.error(res.data.message)
        }
      }).catch(err => {
        message.error(err.message)
      })
    } else {
      dispatch(openAuthModal())
    }
  }

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
        {data.map((e) => {
          return (
            
              <Card
                key={e.id} 
                style={{cursor: "pointer", width: "250px"}}
                // key={e.id}
                className={styles.card}
                cover={
                  <Link href={"/material/" + e.id}>
                      <div style={{width: "250px", height: "320px", overflow: "hidden"}}>
                        <img                    
                          alt="example"
                          style={{width: "100%", height: "auto"}}
                          // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                          src={(e.photo.length > 0)? e.photo.filter(e => e.mainPhoto === 1).length === 0? server.back + "/api/photo/" + e.photo[0].image :
                            server.back + "/api/photo/" + e.photo.filter(e => e.mainPhoto === 1)[0].image : 
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH2Hn4Sf0R9tFaYQcL5HKr35G6d-E6kcOMfo8JoZ0&s"}
                        />
                      </div>
                </Link>
                }
                actions={[<Button type="primary" onClick={() => addInCart(e.id)}>В корзину</Button>]}
              >
                <Meta title={e.name} description={<h2>{e.price} ₽</h2>} />
              </Card>
          )
        })}
      </div>
    </Content>
  );
};

export default MainContent;
