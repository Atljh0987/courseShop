import axios from 'axios'
import * as types from '../types'
import { message } from 'antd'
import { server } from '../config'

export const firstLoadMaterials = () => {  
  return dispatch => {
    axios.get(server.back + "/api/materials/all", { withCredentials: true }).then(res => {
      dispatch(firstLoadMaterialsSuccess(res.data))
    }).catch(err => {
      message.error(err.message)
      console.log(err)
      setTimeout(() => dispatch(firstLoadMaterials()), 5000)
    })
  }
}

const firstLoadMaterialsSuccess = data => ({
  type: types.FIRSTLOADMATERIALS,
  payload: [
    ...data
  ]
});


export const categoryMaterials = url => {
  return dispatch => {
    axios.get(server.back + "/api" + url, { withCredentials: true }).then(res => {
      dispatch(categoryMaterialsSuccess(res.data))
    }).catch(err => {
      message.error(err.message)
      console.log(err)
    })
  }
}

const categoryMaterialsSuccess = data => ({
  type: types.CATEGORYMATERIALS,
  payload: [
    ...data
  ]
});
