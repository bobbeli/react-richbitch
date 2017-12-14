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
                fetching: false,
                fetched: true,

            }
        }
    }
    return state;
}