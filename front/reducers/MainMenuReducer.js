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

export const mainMenuReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case types.FIRSTLOADMENU:
        // let temp = state
        // temp.filter(e => e.key == 'materials')[0].children = payload
        return state = [
          {
            label: 'Товары',
            key: 'materials',
            icon: <MailOutlined />,
            children: payload,
          },
        ]
      default:
        return state
    }
  }