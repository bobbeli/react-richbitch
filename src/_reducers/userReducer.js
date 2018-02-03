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
            return {
                ...state,
                username: action.user.username,
                firstname: action.user.firstname,
                lastname: action.user.lastname,
                email: action.user.email,
                totalPoints: action.user.totalPoints,
                rank: action.user.rank,
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