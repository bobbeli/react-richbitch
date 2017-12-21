import { userConstants } from '../_constants/userConstants';

let user = '';
const initialState = user ? { loggedIn: true, user } : {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                loggingIn: true,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                loggedIn: true,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                fetching: false,
                fetched: true,
                loggedIn: false,
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                fetching: false,
                fetched: false,
                loggedIn: false,
            };
        case userConstants.RE_AUTH_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                loggingIn: true,
                reAuth: true,
            };
        case userConstants.RE_AUTH_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                loggingIn: true,
                reAuth: false,
            };
        case userConstants.RE_AUTH_FAILURE:
            return {
                ...state,
                fetching: false,
                fetched: true,
                loggingIn: true,
                reAuth: false,
            };
        default:
            return state
    }
}
