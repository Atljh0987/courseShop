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
    const arrayToChange = Array.from(initState)

    switch (type) {
      case types.FIRSTLOADMENU:
        arrayToChange.filter(e => e.key === 'materials')[0].children = payload.map(e => {
          return {
            // type: 'group',
            label: e.name,
            children: e.subCategories.map(e2 => {
              return {
                label: e2.name,
                key: e2.id
              }
            })
          }
        })

        return state = arrayToChange
      default:
        return state
    }
  }