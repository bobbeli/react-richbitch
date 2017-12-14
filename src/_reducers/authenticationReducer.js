import { userConstants } from '../_constants/userConstants';

let user = '';
const initialState = user ? { loggedIn: true, user } : {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
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
