/* TODO: rewrite Reducer as in eample code */

import {userConstants} from "../_constants/userConstants";

export default function reducer(state = {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    totalPoints: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case userConstants.USER_UPDATE: {
            return {
                ...state,
                username: action.user.username,
                firstname: action.user.firstname,
                lastname: action.user.lastname,
                email: action.user.email,
                totalPoints: action.user.totalPoints,
                fetching: false,
                fetched: true,

            }
        }
        case userConstants.DELETE_SUCCESS: {
            return {
                ...state,
                id: null,
                username: null,
                firstname: null,
                lastname: null,
                email: null,
                totalPoints: null,
                fetching: false,
                fetched: false,
                error: null,
            }
        }
    }
    return state;
}