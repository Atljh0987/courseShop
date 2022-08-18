import * as types from '../types'

const authState = {
  isAuth: false,
  username: '',
  role: ''
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
  visible: false
}

export const authModalReducer = (state = authModal, {type, payload}) => {
  switch(type) {
    case types.OPENMODAL:
      return state = { visible: true }
    case types.CLOSEMODAL:
      return state = { visible: false }
    default:
      return state
  }
} 