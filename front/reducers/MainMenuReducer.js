import { MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { categoryMaterials } from '../actions/MaterialsActions'
import { server } from '../config'
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
            // key: e.id,
            // label: e.name,
            label: (
              <Link href={"/category/" + e.id}>
                {e.name}
              </Link>
            ),
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