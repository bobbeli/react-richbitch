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
    totalPoints: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case userConstants.USER_UPDATE: {
            console.log('user updat', action.user)
            return {
                ...state,
                username: action.user.username || 'Anonymous',
                firstname: action.user.firstname || 'Anonymous',
                lastname: action.user.lastname || 'Anonymous',
                email: action.user.email || 'Anonymous',
                totalPoints: action.user.totalPoints || 'Anonymous',
                rank: action.user.rank || 'Anonymous',
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
            console.log('update local rak', action)
            return {
                ...state,
                rank: action.rank
            }
        }
    }
    return state;
}