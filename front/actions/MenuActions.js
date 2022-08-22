import axios from 'axios'
import * as types from '../types'
import { message } from 'antd'
import { server } from '../config'

export const loadMenu = () => {  
  return dispatch => {
    axios.get(server.back + "/api/category/all", { withCredentials: true }).then(res => {
      dispatch(loadMenuSuccess(res.data))
    }).catch(err => {
      message.error(err.message);
      console.log(err)
      setTimeout(() => dispatch(loadMenu()), 5000)
    })
  }
}

const loadMenuSuccess = data => ({
  type: types.FIRSTLOADMENU,
  payload: [
    ...data
  ]
});

export const loadControlMenu = () => ({type: types.FIRSTLOADCONTROLMENU})



