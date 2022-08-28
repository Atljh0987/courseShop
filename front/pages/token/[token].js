import { Layout } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { checkLogin } from '../../actions/AuthAction'
import { server } from '../../config'

export async function getServerSideProps({params, req}) {
  try {
    const res = await axios.get(server.back + '/api/token/' + params.token, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    })
    const data = res.data

    if(data.successToken) {
      return { props: { success: true, data: data.message } }
    } else {
      return { props: { success: false, data: data.message } }
    }    
  } catch(err) {
    console.log(err.message)
    return { props: { success: false, data: "Ошибка при отправке запроса, попробуйте пройти по ссылке повторно" } }
  }
}

const TokenConfirm = ({data}) => {
  const dispatch = useDispatch()
  dispatch(checkLogin())

  return <Layout style={{display: "flex", justifyContent: "center", backgroundColor: "#f0f2f5", height: "100vh", width: "100%"}}>
    <div style={{display: "flex", flexFlow: "column wrap", alignItems: "center"}}>
      <h1>{data}</h1>
      <Link href="/">На главную страницу</Link>
    </div>
  </Layout>
}

export default TokenConfirm