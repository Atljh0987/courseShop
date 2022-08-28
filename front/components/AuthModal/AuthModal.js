import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Radio, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { checkLogin, closeAuthModal, openConfirmedModal } from '../../actions/AuthAction';
import axios from 'axios';
import { server } from '../../config';
import { useRouter } from 'next/router';

const axiosSignin = (username, password) => {
  const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    return axios.post(server.back + "/api/process_login", params, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }, { withCredentials: true }).then(res => {
      if(res.data.success) {
        
        return true
      } else {        
        message.warning("Неверный логин или пароль")
        return false
      }
    }).catch(err => {
      console.log(err)
      return false
    })
}

const SignIn = ({setForm}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const link = useSelector((state) => state.authModal.link)

  const onFinish = ({username, password}) => {  
    axiosSignin(username, password).then(success => {
      if(success) {
        dispatch(checkLogin())
        dispatch(closeAuthModal())
        router.push(link)
      }
    })      
  }

  return (
    <>
      <Form
        id="signIn"
        name="signIn"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Необходимо ввести логин!' }]}
        >
          <Input prefix={<UserOutlined/>} placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Необходимо ввести пароль!' }]}
        >
          <Input.Password
            prefix={<LockOutlined/>}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <a href="#" onClick={() => setForm("resetPassword")}>
            Восстановить пароль
          </a>
        </Form.Item>
      </Form>
    </>
  )
}

const SignUp = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const link = useSelector((state) => state.authModal.link)
  const [alert, setAlert] = useState({color: "red", message: ""})
  const [loading, setLoading] = useState(false)

  const onFinish = (val) => {
    setAlert({message: "", color: "green"})
    setLoading(true)
    const params = new URLSearchParams()
    params.append('username', val.username)
    params.append('password', val.password)
    params.append('email', val.email)
    params.append('role', "ROLE_USER")

    axios.post(server.back + '/api/auth/registration', params, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }, { withCredentials: true }).then(res => {
      setLoading(false)
      const data = res.data
      if(data.successRegistration) {
        axiosSignin(val.username, val.password).then(success => {
          if(success) {
            dispatch(checkLogin())
            dispatch(closeAuthModal())
            router.push(link)
            message.success("На почту отправлено письмо с подтверждением")
          }
        }) 
      } else {
        data.errors.forEach(e => message.warning(e.defaultMessage))
      }

    }).catch(err => {
      setLoading(false)
      setAlert({message: err.message, color: "red"})
      console.log(err)
    })
  }

  return (
    <>
      {alert.message !== ""? <h4 style={{color: alert.color}}>{alert.message}</h4> : null}
      {loading? <div style={{width: "100%", display: "flex", justifyContent: "center", marginBottom: "5px"}}><Spin /></div> : null}
      <Form
        id="signUp"
        name="signUp"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Необходимо ввести логин!' }]}
        >
          <Input prefix={<UserOutlined/>} placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Введенная почта некорректна!',
            },
            {
              required: true,
              message: 'Необходимо ввести почту!',
            },
          ]}
        >
          <Input prefix={<MailOutlined/>} placeholder="E-mail"/>
        </Form.Item>


        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Необходимо ввести пароль!',
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined/>} placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Необходимо ввести пароль!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input prefix={<LockOutlined/>} placeholder="Пароль повторно" />
        </Form.Item>
      </Form>
    </>
  )
}

const ResetPassword = ({setForm}) => {
  const [alert, setAlert] = useState({color: "red", message: ""})
  const [loading, setLoading] = useState(false)

  const onFinish = ({email}) => {
    setAlert({message: "", color: "green"})
    setLoading(true)
    axios.post(server.back + '/api/auth/reset_password',{},{ headers: {"email": email}}).then(res => {
      setLoading(false)
      if(res.data.successSentPassword) {
        setAlert({message: "Новый пароль отправлен вам на почту", color: "green"})
      } else {
        setAlert({message: res.data.message, color: "red"})
      }
    }).catch(err => {
      setLoading(false)
      message.error(err.message);
    })
  }


  return (
    <>
      {alert.message !== ""? <h4 style={{color: alert.color}}>{alert.message}</h4> : null}
      {loading? <div style={{width: "100%", display: "flex", justifyContent: "center", marginBottom: "5px"}}><Spin /></div> : null}
      <Form
        id="resetPassword"
        name="resetPassword"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Введенная почта некорректна!',
              },
              {
                required: true,
                message: 'Необходимо ввести почту!',
              },
            ]}
          >
            <Input prefix={<MailOutlined/>} placeholder="E-mail"/>
          </Form.Item>
          <a href="#" onClick={() => setForm("signIn")}>
            &lt; Назад
          </a>
          
      </Form>
    </>
  )
}

const AuthModal = () => {
  const visible = useSelector((state) => state.authModal.visible)
  const dispatch = useDispatch()
  const closeAuthModalDispatch = () => {dispatch(closeAuthModal())} 
  const [form, setForm] = useState("signIn")
  let title = (form === "signIn")? "Вход" : "Регистрация"
  let currentForm = (form === "signIn")? <SignIn setForm={setForm}/> : <SignUp/>
  let footerButton = (form === "signIn")? 
      <Button form="signIn" key="submit" htmlType="submit" type="primary">Войти</Button>:
      <Button form="signUp" key="submit" htmlType="submit" type="primary">Зарегистрироваться</Button>

  const changeForm = (e) => {
    setForm(e.target.value)
  }

  return (
    <>
      <Modal
        visible={visible}
        title={(form === "resetPassword")? "Восстановление пароля" : title }
        onCancel={closeAuthModalDispatch}
        footer={[
          (form === "resetPassword")? <Button form="resetPassword" key="submit" htmlType="submit" type="primary">Восстановить</Button> : footerButton,
          
          <Button key="cansel" onClick={closeAuthModalDispatch}>
            Отмена
          </Button>
        ]}
      >
      <Radio.Group onChange={changeForm}>
        <Radio.Button value="signIn" checked>Войти</Radio.Button>
        <Radio.Button value="signUp">Зарегистрироваться</Radio.Button>
      </Radio.Group>
      <br/>
      <br/>

      {
        (form === "resetPassword")? <ResetPassword setForm={setForm}/> : currentForm 
      }
        
      </Modal>
    </>
  )
}

export default AuthModal