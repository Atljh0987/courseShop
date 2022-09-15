import axios from "axios"
import MainHeader from "../components/MainHeader/MainHeader"
import { server } from "../config"

export async function getServerSideProps({req}) {
  
  try {
    const user = await axios.get(server.back + '/api/auth/check', {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    })

    const userId = user.data.userId
  
    const res = await axios.get(server.back + '/api/cart/all', {
        withCredentials: true,
        headers: {
          userId: userId,
          Cookie: req.headers.cookie
        }
    })
    const data = res.data

    if(data.hasAccess) {
      return { props: { success: true, data } }
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }    
  } catch(err) {
    console.log(err)
    return { props: { success: false, data: []} }
  }  
}

const Cart = ({data}) => {
  return (<div>
    <MainHeader />
    <h1>Корзина</h1>
    </div>)
}

export default Cart