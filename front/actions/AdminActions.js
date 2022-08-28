import * as types from '../types'

export const PageSwitcher = (page) => {
  const route = "/" + page
  switch(page) {
    case 'users': dispatch(goOnPage(route))
    default: dispatch(getAllUsers('/'))
  }
}

const goOnPage = (page) => {
  return {type: types.ADMINUSERSPAGE, payload: {activePage: page}}
}

const getAllUsers = () => {
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
}