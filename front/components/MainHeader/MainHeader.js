import { LoginOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Menu, message } from "antd"
import { Header } from "antd/lib/layout/layout"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkLogin, openAuthModal, logout, checkAccess } from "../../actions/AuthAction"
import { loadControlMenu, loadMenu } from "../../actions/MenuActions"
import AuthModal from "../AuthModal/AuthModal"
import styles from "./MainHeader.module.css"
import Link from 'next/link'
import axios from "axios"
import { server } from "../../config"
import ConfirmModal from "../ConfirmModal/ConfirmModal"

const MainHeader = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMenu())
    dispatch(loadControlMenu())
    dispatch(checkLogin())
  }, [dispatch])

  const data = useSelector((state) => state.mainMenu)
  const control = useSelector((state) => state.controlMenu)  

  const onLogout = () => {
    axios.get(server.back + "/api/logout", { withCredentials: true }).then(() => {
      dispatch(logout())
    }).catch(err => {
      message.error(err.message)
      console.log(err)
    })
  }

  const onClick = ({key}) => {
    switch(key) {
      case 'signIn':
        dispatch(openAuthModal()); break;
      case 'logout':
        onLogout(); break;
      default:
        dispatch(checkAccess(key))      
    }
  }

  return (
    <Header className={styles.header}>
      <Link className={styles.logo} href="/"><h1 className={styles.logo}>
        Интернетный магазин
      </h1></Link>
      {/* <MainMenu className={styles.mainMenu}/> */}
      <Menu 
        onClick={({key}) => dispatch(categoryMaterials("/materials/subcategory/" + key))} 
        theme='dark' 
        className={styles.menu} 
        mode="horizontal" 
        items={data}
      />
      <Menu className={styles.controlMenu} onClick={onClick} theme='dark' mode="horizontal" items={control} />
      <AuthModal/>
      <ConfirmModal/>
    </Header>
  )
}

export default MainHeader
