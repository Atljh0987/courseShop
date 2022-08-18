import { combineReducers } from 'redux'
import { timerReducer } from './timeResucer'
import { counterReducer } from './counterReducer'
import { mainMenuReducer, controlMenu } from './MainMenuReducer'
import { materialsReducer } from './MaterialsReducer'
import { authModalReducer, authReducer } from './AuthReducer'

// COMBINED REDUCERS
const reducers = {
  materials: materialsReducer,
  mainMenu: mainMenuReducer,
  counter: counterReducer,
  timer: timerReducer,
  auth: authReducer,
  authModal: authModalReducer,
  controlMenu: controlMenu
}

export default combineReducers(reducers)
