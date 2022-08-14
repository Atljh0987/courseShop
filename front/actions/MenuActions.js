import axios from 'axios'
import * as types from '../types'

// export const loadMenu = () => ({ type: types.FIRSTLOADMENU })
export const loadMenu = () => {
  return dispatch => {
    axios.get("http://localhost:3000/api/materials/all").then(res => {
      dispatch(loadMenuSuccess(res.data))
    }).catch(err => {
      console.log(err)
    })
  }
}

const loadMenuSuccess = data => ({
  type: types.FIRSTLOADMENU,
  payload: [
    ...data
  ]
});


