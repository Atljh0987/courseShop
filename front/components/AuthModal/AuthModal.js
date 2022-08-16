import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { closeAuthModal } from '../../actions/AuthAction';



const SignIn = () => {
  return (
    <>

    </>
  )
}


const AuthModal = () => {
  const visible = useSelector((state) => state.authModal.visible)
  const dispatch = useDispatch()

  const closeAuthModalDispatch = () => {dispatch(closeAuthModal())} 


  return (
    <>
      <Modal
        visible={visible}
        title="Title"
        // // onOk={handleOk}
        onCancel={closeAuthModalDispatch}
        footer={[
          // <Button key="back">
          //   Return
          // </Button>,
          <Button key="submit" type="primary">
            Отправить
          </Button>,
          <Button key="cansel" onClick={closeAuthModalDispatch}>
            Отмена
          </Button>,
          // <Button
          //   key="link"
          //   href="https://google.com"
          //   type="primary"
          // >
          //   Search on Google
          // </Button>,
        ]}
      >
        
      </Modal>
    </>
  )
}

export default AuthModal