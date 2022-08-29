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


export const usersActions = (action) => {
  return dispatch => {
    switch(action) {
      case 'getAll': dispatch(getAllUsers())
    }
  }
}

const getAllUsers = () => {
  return dispatch => {
    axios.get(server.back + '/api/users/all').then(res => {
      const data = res.data
      const dto = data.map(e => {return {key: e.id, username: e.username, email: e.email, role: e.role, confirmed: e.confirmed == 1? "Подтвержден":"Не подтвержден"}})
      dispatch({type: types.GETALLUSERS, payload: {loading: false, data: dto}})
    }).catch(err => {
      console.log(err)
      setTimeout(() => getAllUsers(), 60000)
    })
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