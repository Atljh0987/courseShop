import "antd/dist/antd.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { firstLoadMaterials } from "../actions/MaterialsActions";
import { loadMenu } from "../actions/MenuActions";
import MainPage from "../components/MainPage/MainPage";

const Index = () => {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMenu())
    dispatch(firstLoadMaterials())
  }, [dispatch])

  
  return (
    <MainPage />
  )
}

export default Index

// const Index = () => {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(startClock())
//   }, [dispatch])

//   return (
//     <>
//       <Examples />
//       <Link href="/show-redux-state">
//         <a>Click to see current Redux State</a>
//       </Link>
//     </>
//   )
// }

// export default Index
