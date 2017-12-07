import { combineReducers } from 'redux'
import user from './userReducer'
import alert from './alertReducer'
import auth from './authenticationReducer'
import registration from './registrationReducer'

export default combineReducers({
    user,
    alert,
    auth,
    registration
});