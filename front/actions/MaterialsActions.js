import axios from 'axios'
import * as types from '../types'
import { message } from 'antd'
import { server } from '../config'
import { count } from '../reducers/MaterialsReducer'
import { controlMenu } from '../reducers/MainMenuReducer'

export const firstLoadMaterials = () => {  
  return dispatch => {
    axios.get(server.back + "/api/material/all", { withCredentials: true }).then(res => {
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

// ************************* Admin

export const getCountAction = () => {
  return dispatch => {
    axios.get(server.back + '/api/auth/check', {
      withCredentials: true
    }).then(res => {
      const userId = res.data.userId
      if(userId) {
        axios.get(server.back + '/api/cart/count/all/' + userId).then(res2 => {
          dispatch({type: types.CARTCOUNT, payload: res2.data})
        })
      }      
    })
    
  }
}

export const materialsActions = (type, payload) => {
  return dispatch => {
    switch(type) {
      case 'getAll':
        dispatch(getAllAction()); break;
      case 'editmaterial': 
        dispatch(editAction(payload)); break;
      case 'saveEditmaterial':
        dispatch(saveEdited(payload)); break;
      default: return null;
    }
  }
}

const getAllAction = () => {
  return dispatch => {
    axios.get(server.back + '/api/material/all').then(res => {
      return axios.get(server.back + '/api/category/all').then(categories => {
        return axios.get(server.back + '/api/subcategory/all').then(subcategories => {
          const data = res.data
          const dto = data.map(e => {
            return {
              key: e.id, 
              name: e.name ?? 'Нет названия',
              description: e.description ?? 'Нет описания',
              count: e.count,
              price: e.price,
              category: e.category,
              categories: categories.data,
              categorySelect: e.category,
              subCategory: e.subCategory,
              subCategories: subcategories.data,
              subCategoriesConst: subcategories.data,
              subCategorySelect: e.subCategory
            }
          })
          dispatch({type: types.ALLMATERIALS, payload: {loading: false, data: dto}})
        })
      })
    }).catch(err => {
      console.log(err.message)
    })
  }
}

const saveEdited = (material) => {  
  return dispatch => {
    if(material) {
      dispatch({type: types.SAVEEDITEDMATERIALS, payload: {loading: false, data: material}})
    } 
  }
}

const editAction = (material) => {  
  return dispatch => {
    dispatch({type: types.ALLMATERIALS, payload: {loading: false, data: material}})
  }
}
