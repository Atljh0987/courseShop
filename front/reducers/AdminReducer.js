import * as types from '../types'

const authState = {
  activePage: '/'
}

export const goToPageReducer = (state = authState, { type, payload }) => {
  switch (type) {
    case types.PAGESWITCHER:
      return state = payload
    default:
      return state
  }
}


const usersState = {
  loading: true,
  data: []
}

export const usersDataReducer = (state = usersState, {type, payload}) => {
  switch(type) {
    case types.GETALLUSERS:
      return state = payload
    default:
      return state
  }
}