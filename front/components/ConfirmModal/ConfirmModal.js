import { Button, Modal } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeConfirmedModal } from "../../actions/AuthAction"

const ConfirmModal = () => {
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.confirmedModal.visible)
  
  return (
    <>
      <Modal
        visible={visible}
        title="Подтверждение почты"
        onCancel={() => dispatch(closeConfirmedModal())}
        footer={[]}
      >
          <p>Необходимо подтвердить электронную почту.</p>
          <Button key="sendAgain" /*onClick={closeAuthModalDispatch}*/>
            Отправить подтверждение
          </Button>
      </Modal>
    </>
  )
}

export default ConfirmModal