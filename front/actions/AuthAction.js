import axios from 'axios'
import * as types from '../types'
import { server } from '../config'
import Link from 'next/link'
import Router from 'next/router'

export const checkLogin = () => {  
  return dispatch => {
    axios.get(server.back + "/api/auth/check").then(res => {
      if(res.data.isAuth) {
        dispatch(logInSuccess(res.data))
      }      
    }).catch(err => {
      message.error(err.message)
      console.log(err)
      setTimeout(() => logIn(), 60000)
    })
  }
}

export const checkAccess = (link) => {
  return dispatch => {
    axios.get(server.back + "/api/" + link).then(res => {
      if(res.data.hasAccess === false) {
        dispatch(openAuthModal())
      } else {        
        // document.location.href = "/orders"
        Router.push('/orders')
        // document.getElementById("aaaa").click()
        // console.log(Link)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

const logInSuccess = data => ({
  type: types.LOGIN,
  payload: data
});

export const logout = () => {return { type: types.LOGOUT }}

export const openAuthModal = () => {return { type: types.OPENMODAL }}
export const closeAuthModal = () => {return { type: types.CLOSEMODAL }}