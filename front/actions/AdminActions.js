import axios from 'axios'
import { server } from '../config'
import * as types from '../types'

export const pageSwitcher = (page) => {
  return dispatch => {
    const route = "/" + page
    dispatch(goOnPage(route))
  }
}

const goOnPage = (page) => {
  return {type: types.PAGESWITCHER, payload: {activePage: page}}
}


export const usersActions = (action, payload) => {
  return dispatch => {
    switch(action) {
      case 'getAll': dispatch(getAllUsers()); break;
      case 'editUser': dispatch(editUser(payload)); break;
      case 'saveEdited': dispatch(saveEdited(payload)); break;
      default: return null
    }
  }
}

const getAllUsers = () => {
  return dispatch => {
    axios.get(server.back + '/api/users/all').then(res => {
      return axios.get(server.back + '/api/roles/all').then(roles => {
        const data = res.data
        const dto = data.map(e => {return {key: e.id, username: e.username, email: e.email, roleKey: e.role, roles: roles.data, roleSelect: e.role, confirmed: e.confirmed == 1? "Подтвержден":"Не подтвержден"}})
        dispatch({type: types.GETALLUSERS, payload: {loading: false, data: dto}})
      })      
    }).catch(err => {
      console.log(err)
      setTimeout(() => getAllUsers(), 60000)
    })
  }
}

const saveEdited = (user) => {
  return dispatch => {
    if(user) {
      dispatch({type: types.SAVEEDITED, payload: {loading: false, data: user}})
      const params = new URLSearchParams()
      params.append('id', user.key)
      params.append('username', user.username)
      params.append('email', user.email)
      params.append('role', user.roleSelect)
      params.append('confirmed', user.confirmed === 'Подтвержден'? 1 : 0)

      axios.put(server.back + '/api/users/edit', params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }    
  }
}

const editUser = (user) => {  
  return dispatch => {
    dispatch({type: types.EDITUSER, payload: {loading: false, data: user}})

  //   
  }
}

// const getAllUsers = () => {
  // return dispatch => {
  //   axios.get(server.back + "/api/auth/check", {
  //     withCredentials: true,
  // }).then(res => {
  //     if(res.data.isAuth) {
  //       dispatch(logInSuccess(res.data))
  //     }      
  //   }).catch(err => {
  //     console.log(err)
  //     setTimeout(() => checkLogin(), 60000)
  //   })
  // }
// }