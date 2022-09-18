import { ControlOutlined, LoginOutlined, MailOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { categoryMaterials, getCountAction } from '../actions/MaterialsActions'
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

const controlInit = [
  {
    label: 'Войти',
    key: 'signIn',
    icon: <LoginOutlined />
  },
  {
    label: "Заказы",
    key: 'orders',
    icon: <ShoppingOutlined />
  },
  {
    label: "Корзина: " + 0,
    key: 'cart',
    icon: <ShoppingCartOutlined />
  },
];

export const controlMenu = (state = controlInit, {type, payload}) => {
  const stateChange = Array.from(controlInit)

  switch(type) {
    case types.FIRSTLOADCONTROLMENU:
      return state
    case types.LOGIN:
      stateChange[stateChange.findIndex(e => e.key === 'signIn')] = {
        label: payload.username, 
        key: 'signIn',
        children: [
          {label: "Выйти", key: "logout"}
        ]
      }

      if(payload.role === 'ROLE_ADMIN') {
        stateChange.push({
          label: 'Админка', 
          key: 'admin',
          icon: <ControlOutlined />
        })
      } else {
        stateChange = stateChange.filter(e => e.key !== 'admin')
      }

      if(payload.isAuth) {
        return state = stateChange 
      } else {
        return state
      }
    case types.LOGOUT:
      state = controlInit
    case types.CARTCOUNT:
      const stateChangeCount = Array.from(state)
      stateChangeCount[stateChangeCount.findIndex(e => e.key === 'cart')] = {
        label: "Корзина: " + (payload ? payload: 0),
        key: 'cart',
        icon: <ShoppingCartOutlined />
      }

      state = stateChangeCount
    default:
      return state
  }
}

const initStateMaterials = {
  loading: false,
  data: []
}

export const allMaterials = (state = initStateMaterials, {type, payload}) => {
  switch(type) {
    case types.ALLMATERIALS:
      return state = payload
    case types.SAVEEDITEDMATERIALS:
      return state
    default: 
      return state
  }
}