import { Header } from "antd/lib/layout/layout"
import MainMenu from "../MainMenu/MainMenu"
import styles from "./MainHeader.module.css"

const MainHeader = () => {
  return (
    <Header className={styles.header}>
      <a className={styles.logo} href="/"><h1>
        Интернетный магазин
      </h1></a>
      <MainMenu className={styles.mainMenu}/>
    </Header>
  )
}

export default MainHeader
