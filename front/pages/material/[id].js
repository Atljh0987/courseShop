import { useRouter } from 'next/router'

const MaterialId = () => {
  const router = useRouter()
  const { id } = router.query

  return <h1>Id: {id}</h1>
}

export default MaterialId