import axios from 'axios'
import * as types from '../types'
import {message} from 'antd'
import { server } from '../config'

export const firstLoadMaterials = () => {  
  return dispatch => {
    axios.get(server.back + "/api/materials/all").then(res => {
      dispatch(firstLoadMaterialsSuccess(res.data))
    }).catch(err => {
      message.error(err.message);
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
