import { Menu } from 'antd'
import { LoginOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import styles from './MainMenu.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { categoryMaterials } from '../../actions/MaterialsActions';

const count = 0;

// const materials = [
//   {
//     label: 'Товары',
//     key: 'materials',
//     // icon: <MailOutlined />,
//     children: [
//       {
//         type: 'group',
//         label: 'Item 1',
//         children: [
//           {
//             label: 'Option 1',
//             key: 'setting:1',
//           },
//           {
//             label: 'Option 2',
//             key: 'setting:2',
//           },
//         ],
//       },
//       {
//         type: 'group',
//         label: 'Item 2',
//         children: [
//           {
//             label: 'Option 3',
//             key: 'setting:3',
//           },
//           {
//             label: 'Option 4',
//             key: 'setting:4',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Товаdasdaры',
//     key: 'materialss',
//     // icon: <MailOutlined />,
//     children: [
//       {
//         type: 'group',
//         label: 'Item 1',
//         children: [
//           {
//             label: 'Option 1',
//             key: 'setting:1',
//           },
//           {
//             label: 'Option 2',
//             key: 'setting:2',
//           },
//         ],
//       },
//       {
//         type: 'group',
//         label: 'Item 2',
//         children: [
//           {
//             label: 'Option 3',
//             key: 'setting:3',
//           },
//           {
//             label: 'Option 4',
//             key: 'setting:4',
//           },
//         ],
//       },
//     ],
//   },
// ]

const control = [
  {
    label: 'Войти',
    key: 'signIn',
    icon: <LoginOutlined />,
  },
  {
    label: (
      <a style={{color: "white"}} href="/orders" target="_blank" rel="noopener noreferrer">
        Заказы
      </a>
    ),
    key: 'orders',
    icon: <ShoppingOutlined />
  },
  {
    label: (
      <a style={{color: "white"}} href="/cart" target="_blank" rel="noopener noreferrer">
        Корзина: <span>{count}</span>
      </a>
    ),
    key: 'cart',
    icon: <ShoppingCartOutlined />
  },
];

const MainMenu = () => {
  const data = useSelector((state) => state.mainMenu)
  const dispatch = useDispatch()



  return (
    <>
      <Menu 
        onClick={({key}) => dispatch(categoryMaterials("/materials/subcategory/" + key))} 
        theme='dark' 
        className={styles.menu} 
        mode="horizontal" 
        items={data}
      />
      <Menu theme='dark' mode="horizontal" items={control} />
    </>
  )
}

export default MainMenu
