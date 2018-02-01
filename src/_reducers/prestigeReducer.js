/* TODO: rewrite Reducer as in eample code */

import {userConstants} from "../_constants/userConstants";
import {pointConstants} from "../_constants/pointConstants";

export default function reducer(state = {
    id: null,
    username: null,
    email: null,
    totalPoints: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case userConstants.PRESTIGE_UPDATE: {
            console.log('prestige user', action)
            return {
                ...state,
                username: action.user.username,
                email: action.user.email,
                totalPointsRight: action.user.totalPoints,
                totalPointsLeft: action.user.totalPoints,
                fetching: false,
                fetched: true,

            }
        }
    }
    return state;
}