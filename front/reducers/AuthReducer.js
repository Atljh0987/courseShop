import * as types from '../types'

const authState = {
  isAuth: false,
  username: '',
  email: '',
  role: '',
  confirmed: 0
}

export const authReducer = (state = authState, { type, payload }) => {
  switch (type) {
    case types.LOGIN:
      return state = payload
    default:
      return state
  }
}

const authModal = {
  visible: false,
  link: '/'
}

export const authModalReducer = (state = authModal, {type, payload}) => {
  switch(type) {
    case types.OPENMODAL:
      return state = { visible: true, link: payload || '/' }
    case types.CLOSEMODAL:
      return state = { visible: false }
    default:
      return state
  }
} 

const confirmedModal = {
  visible: false
}

export const confirmedModalReducer = (state = confirmedModal, {type}) => {
  switch(type) {
    case types.OPENCONFIRMEDMODAL:
      return state = { visible: true }
    case types.CLOSECONFIRMEDMODAL:
      return state = { visible: false }
    default:
      return state
  }
} 