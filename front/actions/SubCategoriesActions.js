import axios from "axios";
import { server } from "../config";
import * as types from '../types'

export const subCategoriesActions = (type, payload) => {
  return dispatch => {
    switch(type) {
      case 'getAll':
        dispatch(getAllAction()); break;
      case 'editsubcategory': 
        dispatch(editAction(payload)); break;
      case 'saveEditsubcategory':
        dispatch(saveEdited(payload)); break;
      default: return null;
    }
  }
}

const getAllAction = () => {
  return dispatch => {
    axios.get(server.back + '/api/subcategory/all').then(res => {
      return axios.get(server.back + '/api/category/all').then(categories => {
        const data = res.data
        const dto = data.map(e => {
          return {
            key: e.id, 
            name: e.name,
            category: e.category,
            categories: categories.data,
            categorySelect: e.category
          }
        })
        dispatch({type: types.ALLSUBCATEGORIES, payload: {loading: false, data: dto}})
      })
    }).catch(err => {
      console.log(err.message)
    })
  }
}



export const getSubcategoriesForCategory = (id) => {
  return dispatch => {
    axios.get(server.back + '/api/subcategory/allbycategoryid/' + id).then(res => {
      dispatch({type: types.GETSUBCATEGORIESFORCATEGORY, payload: {loading: false, data: res.data}})
    }).catch(err => {
      console.log(err.message)
    })
  }
}

const saveEdited = (subcategory) => {  
  return dispatch => {
    if(subcategory) {
      dispatch({type: types.SAVEEDITEDSUBCATEGORIES, payload: {loading: false, data: subcategory}})
    } 
  }
}

const editAction = (subcategory) => {  
  return dispatch => {
    dispatch({type: types.ALLSUBCATEGORIES, payload: {loading: false, data: subcategory}})
  }
}