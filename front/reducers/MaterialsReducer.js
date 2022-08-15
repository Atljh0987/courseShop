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