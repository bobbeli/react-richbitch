/* TODO: rewrite Reducer as in eample code */

import {userConstants} from "../_constants/userConstants";

export default function reducer(state = {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    console.log('user reducer updating called', action)

    switch (action.type) {
        case userConstants.USER_UPDATE: {
            return {
                ...state,
                username: action.user.username,
                firstname: action.user.firstname,
                lastname: action.user.lastname,
                email: action.user.email,
                fetching: 'arschloch'
            }
        }
        case 'FETCH_USERS_REJECTED': {
            return {...state, fetching: false, error: action.payload}
        }
        case 'FETCH_USERS_FULFILLED': {
            return {
                ...state,
                id: 1,
                username: 'asdfasdf',
                firstname: 'asdf',
                lastname: 'asdf',
                email: 'asdf',
                fetching: false,
                fetched: false,
                error: null,
            }
        }
    }
    return state;
}