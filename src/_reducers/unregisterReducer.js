/* TODO: rewrite Reducer as in eample code */

import {userConstants} from "../_constants/userConstants";

export default function reducer(state = {
    id: null,
    failure: false,
    fetching: false,
    fetched: false,
    reAuth: false,
    error: null,
}, action) {
    switch (action.type) {
        case userConstants.DELETE_REQUEST: {
            return {
                ...state,
                failure: false,
                reAuth: false,
                fetching: true,
                fetched: false,
            }
        }
        case userConstants.DELETE_FAILURE: {
            if(action.error.code=== 'auth/requires-recent-login'){
                return {
                    ...state,
                    reAuth: true,
                    failure: true,
                    fetching: false,
                    fetched: true,
                }
            }else{
                return {
                    ...state,
                    failure: true,
                    reAuth: false,
                    fetching: false,
                    fetched: true,
                }
            }

        }
        case userConstants.DELETE_SUCCESS: {
            return {
                ...state,
                failure: false,
                reAuth: false,
                fetching: false,
                fetched: false,
                error: null,
            }
        }
    }
    return state;
}