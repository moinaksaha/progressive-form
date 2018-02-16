import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import form from './form'

export default combineReducers({
  routing: routerReducer,
  counter,
  form
})