import { Button, message, Modal, Spin } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeConfirmedModal } from "../../actions/AuthAction"
import { server } from "../../config"

const ConfirmModal = () => {
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.confirmedModal.visible)
  const email = useSelector((state) => state.auth.email)
  const [loading, setLoading] = useState(false)

  const closeConfirmModal = () => {
    dispatch(closeConfirmedModal())
  }

  const sendConfirm = () => {
    setLoading(true)
    axios.post(server.back + '/api/email/token/' + email).then(res => {
      setLoading(false)
      message.success("Письмо отправлено")
      closeConfirmModal()
    }).catch(err => {
      setLoading(false)
      message.error(err.message)
      console.log(err)
    })
  }
  
  return (
    <>
      
      <Modal
        visible={visible}
        title="Подтверждение почты"
        onCancel={closeConfirmModal}
        footer={[]}
      >
          {loading? <div style={{width: "100%", display: "flex", justifyContent: "center", marginBottom: "5px"}}><Spin /></div> : null}
          <p>Необходимо подтвердить электронную почту.</p>
          <Button key="sendAgain" onClick={sendConfirm}>
            Отправить подтверждение
          </Button>
      </Modal>
    </>
  )
}

export default ConfirmModal