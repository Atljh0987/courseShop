import axios from 'axios'
import { useRouter } from 'next/router'
import MainHeader from '../../components/MainHeader/MainHeader'
import { server } from '../../config'
import "antd/dist/antd.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import styles from '../../css/MaterialId.module.css'

export async function getServerSideProps({params, req}) {  
  const id = params.id

  try {
    const res = await axios.get(server.back + '/api/material/' + id, {
      withCredentials: true
    })
    const material = res.data
    return { props: { success: true, material } }
  } catch(err) {
    console.log(err)
    return { props: { success: false, material: []} }
  }
}

const MaterialId = ({material}) => {
  return (
    <div>
      <MainHeader />
      <h1>{material.name}</h1>
      <div className={styles.wrapper}>
        <div style={{width: "25%"}}>
          <Carousel>
            {
              material.photo.sort((a, b) => b.id - a.id).map(e => {
                return (
                  <div key={e.id}>
                    <img src={server.back + '/api/photo/' + e.image}/>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div>
          {material.description ?? "Нет описания"}
        </div>
      </div>
    </div>    
  )
}

export default MaterialId