import { typeList } from "antd/lib/message"
import * as types from '../types'

const initState = {
  loading: false,
  data: []
}

export const allCategories = (state = initState, {type, payload}) => {
  switch(type) {
    case types.ALLCATEGORIES:
      return state = payload
    case types.SAVEEDITEDCATEGORIES:
      return state
    default: 
      return state
  }
}