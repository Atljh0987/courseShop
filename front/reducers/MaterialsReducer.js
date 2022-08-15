import { MailOutlined } from '@ant-design/icons'
import * as types from '../types'


const initState = [
  {
    label: 'Товары',
    key: 'materials',
    icon: <MailOutlined />,
    children: [
    ],
  },
]

export const materialsReducer = (state = [], { type, payload }) => {
    switch (type) {
      case types.FIRSTLOADMATERIALS:
        return state = payload
      default:
        return state
    }
  }