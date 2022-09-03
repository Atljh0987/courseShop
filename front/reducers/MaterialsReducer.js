import { MailOutlined } from '@ant-design/icons'
import * as types from '../types'

export const materialsReducer = (state = [], { type, payload }) => {
    switch (type) {
      case types.FIRSTLOADMATERIALS:
        return state = payload
      case types.CATEGORYMATERIALS:
        return state = payload
      default:
        return state
    }
  }


const initState = {
  loading: false,
  data: []
}

export const allMaterials = (state = initState, {type, payload}) => {
  switch(type) {
    case types.ALLMATERIALS:
      return state = payload
    case types.SAVEEDITEDMATERIALS:
      return state
    default: 
      return state
  }
}