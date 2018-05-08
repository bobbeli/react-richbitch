/* TODO: rewrite Reducer as in eample code */

import {userConstants} from "../_constants/userConstants";
import {pointConstants} from "../_constants/pointConstants";

export default function reducer(state = {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    rank: null,
    pushToken: null,
    totalPoints: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case userConstants.USER_UPDATE: {
            return {
                ...state,
                username: action.user.username || 'Anonymous',
                firstname: action.user.firstname || 'Anonymous',
                lastname: action.user.lastname || 'Anonymous',
                email: action.user.email || 'Anonymous',
                totalPoints: action.user.totalPoints || 'Anonymous',
                rank: action.user.rank || 'Anonymous',
                pushToken: action.user.pushToken || 'Anonymous',
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
                rank: null,
                pushToken: null,
                totalPoints: null,
                fetching: false,
                fetched: false,
                error: null,
            }
        }

        case pointConstants.TOTAL_POINTS_UPDATE: {
            return {
                ...state,
                totalPoints: action.totalPoints
            }
        }

        case userConstants.RANK_UPDATE: {
            return {
                ...state,
                rank: action.rank
            }
        }
        case userConstants.PUSH_TOKEN_UNSUBSCRIBE: {
            return {
                ...state,
                pushToken: null
            }
        }

        case userConstants.PUSH_TOKEN_SUBSCRIBE: {
            return {
                ...state,
                pushToken: action.pushToken
            }
        }
    }
    return state;
}