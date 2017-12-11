import { combineReducers } from 'redux'
import userList from './userListReducer'
import alert from './alertReducer'
import auth from './authenticationReducer'
import registration from './registrationReducer'
import user from './userReducer'

export default combineReducers({
    user,
    userList,
    alert,
    auth,
    registration
});