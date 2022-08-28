import * as types from '../types'

const authState = {
  activePage: '/'
}

export const goToPageReducer = (state = authState, { type, payload }) => {
  switch (type) {
    case types.ADMINUSERSPAGE:
      return state = payload
    default:
      return state
  }
}