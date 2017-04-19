
import { combineReducers } from 'redux'
import loginStatus from './login'
import customersState from './customers'

const customerViewApp = combineReducers({
  loginStatus,
  customersState
});

export default customerViewApp
