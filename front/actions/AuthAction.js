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
      console.log(err)
      setTimeout(() => checkLogin(), 60000)
    })
  }
}

export const checkAccess = (link) => {
  return dispatch => {
    axios.get(server.back + "/api/" + link, { withCredentials: true }).then(res => {
      if(res.data.hasAccess === false) {
        dispatch(openAuthModal('/orders'))
      } else {        
        Router.push('/' + link)
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

export const openAuthModal = (link) => {return { type: types.OPENMODAL, payload: link }}
export const closeAuthModal = () => {return { type: types.CLOSEMODAL }}

export const openConfirmedModal = () => {return { type: types.OPENCONFIRMEDMODAL }}
export const closeConfirmedModal = () => {return { type: types.CLOSECONFIRMEDMODAL }}