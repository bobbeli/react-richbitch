import { combineReducers } from 'redux'
import user from './userReducer'
import alert from './alertReducer'
import auth from './authenticationReducer'
import register from './registrationReducer'

export default combineReducers({
    user,
    alert,
    auth,
    register
});