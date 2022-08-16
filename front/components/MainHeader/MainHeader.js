import { LoginOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { Header } from "antd/lib/layout/layout"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openAuthModal } from "../../actions/AuthAction"
import { loadMenu } from "../../actions/MenuActions"
import AuthModal from "../AuthModal/AuthModal"
import MainMenu from "../MainMenu/MainMenu"
import styles from "./MainHeader.module.css"

const count = 0;

const control = [
  {
    label: 'Войти',
    key: 'signIn',
    icon: <LoginOutlined />,
  },
  {
    label: (
      <a style={{color: "white"}} href="/orders" target="_blank" rel="noopener noreferrer">
        Заказы
      </a>
    ),
    key: 'orders',
    icon: <ShoppingOutlined />
  },
  {
    label: (
      <a style={{color: "white"}} href="/cart" target="_blank" rel="noopener noreferrer">
        Корзина: <span>{count}</span>
      </a>
    ),
    key: 'cart',
    icon: <ShoppingCartOutlined />
  },
];

const MainHeader = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMenu())
  }, [dispatch])

  const data = useSelector((state) => state.mainMenu)

  return (
    <Header className={styles.header}>
      <a className={styles.logo} href="/"><h1>
        Интернетный магазин
      </h1></a>
      {/* <MainMenu className={styles.mainMenu}/> */}
      <Menu 
        onClick={({key}) => dispatch(categoryMaterials("/materials/subcategory/" + key))} 
        theme='dark' 
        className={styles.menu} 
        mode="horizontal" 
        items={data}
      />
      <Menu onClick={({key}) => dispatch(openAuthModal())} theme='dark' mode="horizontal" items={control} />
      <AuthModal/>
    </Header>
  )
}

export default MainHeader
