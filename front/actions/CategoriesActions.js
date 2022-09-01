import axios from "axios";
import { server } from "../config";
import * as types from '../types'

export const categoriesActions = (type, payload) => {
  return dispatch => {
    switch(type) {
      case 'getAll':
        dispatch(getAllAction()); break;
      case 'editCategory': 
        dispatch(editAction(payload)); break;
      case 'saveEditCategory':
        dispatch(saveEdited(payload)); break;
      default: return null;
    }
  }
}

const getAllAction = () => {
  return dispatch => {
    axios.get(server.back + '/api/category/all').then(res => {
      const data = res.data
        const dto = data.map(e => {
          return {
            key: e.id, 
            name: e.name,
          }
        })
      dispatch({type: types.ALLCATEGORIES, payload: {loading: false, data: dto}})
    }).catch(err => {
      console.log(err.message)
    })
  }
}

const saveEdited = (category) => {  
  return dispatch => {
    if(category) {
      dispatch({type: types.SAVEEDITEDCATEGORIES, payload: {loading: false, data: category}})
    } 
  }
}

const editAction = (category) => {  
  return dispatch => {
    dispatch({type: types.ALLCATEGORIES, payload: {loading: false, data: category}})
  }
}