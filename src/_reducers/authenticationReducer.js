import { userConstants } from '../_constants/userConstants';
import firebase from '../_helpers/fire'

let user = firebase.auth().currentUser;
const initialState = user ? { loggedIn: true, user } : {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
            };
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state
    }
}
