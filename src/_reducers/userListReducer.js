/* TODO: rewrite Reducer as in eample code */
import {userConstants} from "../_constants/userConstants";

export default function reducer(state = {
    users: [
        {
            id: null,
            name: null,
            username: null,
            email: null,
        },
    ],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    //ToDo Refactoring User Redux Types to Constants
    switch (action.type) {
        case 'FETCH_USERS': {
            return {...state, fetching: true}
        }
        case 'FETCH_USERS_REJECTED': {
            return {...state, fetching: false, error: action.payload}
        }
        case 'FETCH_USERS_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload
            }
        }
    }
    return state;
}