import { combineReducers } from 'redux'
import { timerReducer } from './timeResucer'
import { counterReducer } from './counterReducer'

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
}

export default combineReducers(reducers)
