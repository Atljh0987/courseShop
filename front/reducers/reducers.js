import { combineReducers } from 'redux'
import { timerReducer } from './timeResucer'
import { counterReducer } from './counterReducer'
import { mainMenuReducer, controlMenu } from './MainMenuReducer'
import { allMaterials, materialsReducer } from './MaterialsReducer'
import { authModalReducer, authReducer, confirmedModalReducer } from './AuthReducer'
import { goToPageReducer, rolesDataReducer, usersDataReducer } from './AdminReducer'
import { allCategories } from './CategoriesReducer'
import { allSubCategories, subcategoriesFromCategory } from './SubCategoriesReducer'

// COMBINED REDUCERS
const reducers = {
  materials: materialsReducer,
  mainMenu: mainMenuReducer,
  counter: counterReducer,
  timer: timerReducer,
  auth: authReducer,
  authModal: authModalReducer,
  controlMenu: controlMenu,
  confirmedModal: confirmedModalReducer,
  adminGoToPage: goToPageReducer,
  usersData: usersDataReducer,
  rolesData: rolesDataReducer,
  categories: allCategories,
  subcategories: allSubCategories,
  materialsAdmin: allMaterials,
  subFromCategory: subcategoriesFromCategory
}

export default combineReducers(reducers)
