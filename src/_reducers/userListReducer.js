/* TODO: rewrite Reducer as in eample code */
import {userConstants} from "../_constants/userConstants";

export default function reducer(state = {
    users: [
        {
            id: null,
            firstanme: null,
            lastname: null,
            email: null,
            totalPoints: null,
        },
    ],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST: {
            return {
                ...state,
                users: state.users,
                fetching: true,
                fetched: false,
                error: null,
            }
        }
        case userConstants.GETALL_SUCCESS: {

            return {
                ...state,
                users: action.users,
                fetching: false,
                fetched: true,
                error: null,
            }

        }
        case userConstants.GETALL_FAILURE: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: state.users,
                error: action.payload

            }
        }
    }
    return state;
}