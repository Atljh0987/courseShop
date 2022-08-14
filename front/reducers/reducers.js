import { combineReducers } from 'redux'
import { timerReducer } from './timeResucer'
import { counterReducer } from './counterReducer'
import { mainMenuReducer } from './MainMenuReducer'

// COMBINED REDUCERS
const reducers = {
  mainMenu: mainMenuReducer,
  counter: counterReducer,
  timer: timerReducer,
}

export default combineReducers(reducers)
