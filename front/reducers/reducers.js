import { combineReducers } from 'redux'
import { timerReducer } from './timeResucer'
import { counterReducer } from './counterReducer'
import { mainMenuReducer, controlMenu } from './MainMenuReducer'
import { materialsReducer } from './MaterialsReducer'
import { authModalReducer, authReducer, confirmedModalReducer } from './AuthReducer'
import { goToPageReducer, usersDataReducer } from './AdminReducer'

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
  usersData: usersDataReducer
}

export default combineReducers(reducers)
