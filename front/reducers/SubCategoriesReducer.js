import { typeList } from "antd/lib/message"
import * as types from '../types'

const initState = {
  loading: false,
  data: []
}

export const allSubCategories = (state = initState, {type, payload}) => {
  switch(type) {
    case types.ALLSUBCATEGORIES:
      return state = payload
    default: 
      return state
  }
}

const fromCategory = {
  loading: false,
  data: []
}

export const subcategoriesFromCategory = (state = fromCategory, {type, payload}) => {
  switch(type) {
    case types.SAVEEDITEDSUBCATEGORIES:
      return state = payload
    default:
      return state
  }
}