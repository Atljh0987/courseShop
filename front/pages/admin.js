import axios from "axios"
import { server } from "../config"

export async function getServerSideProps({req}) {
  
  try {
    const res = await axios.get(server.back + '/api/admin', {
        withCredentials: true,
        headers: {
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

const Admin = ({data}) => {
  return <h1>Админка</h1>
}

export default Admin