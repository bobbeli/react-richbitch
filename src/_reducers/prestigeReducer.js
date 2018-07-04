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
            return {
                ...state,
                username: action.user.username,
                email: action.user.email,
                totalPoints: action.user.totalPoints,
                totalPointsRight: calcPointsForRight(action.user.totalPoints),
                totalPointsLeft: calcPointsForLeft(action.user.totalPoints),
                fetching: false,
                fetched: true,

            }
        }
    }
    return state;
}

function calcPointsForRight(totalPoint){

    let totalPoints = totalPoint.toString();

    if(totalPoints.length >= 6){
        return totalPoints.substring(totalPoints.length - 6, totalPoints.length);
    }else{

        return totalPoints;
    }
}
function calcPointsForLeft(totalPoint){
    let totalPoints = totalPoint.toString();

    if(totalPoints.length >= 6){
        return totalPoints.substring(0, totalPoints.length - 6);
    }else{
        return '';
    }
}

