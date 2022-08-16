import axios from 'axios'
import * as types from '../types'
import { message } from 'antd'
import { server } from '../config'

export const logIn = () => {  
  // return dispatch => {
  //   axios.get(server.back + "/api/materials/all").then(res => {
  //     dispatch(firstLoadMaterialsSuccess(res.data))
  //   }).catch(err => {
  //     message.error(err.message)
  //     console.log(err)
  //     setTimeout(() => dispatch(firstLoadMaterials()), 5000)
  //   })
  // }
}

const logInSuccess = data => ({
  type: types.LOGIN,
  payload: [
    ...data
  ]
});

export const openAuthModal = () => {return { type: types.OPENMODAL }}
export const closeAuthModal = () => {return { type: types.CLOSEMODAL }}