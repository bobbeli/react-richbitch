import {alertActions} from './alertActions';
import {userConstants} from "../_constants/userConstants"
import store from '../_helpers/store'

export const prestigeActions = {
    calcPrestige,
};

function calcPrestige() {
    return dispatch => {

        findUserWithHighestPrestige().then((user)=> {
            dispatch(update((user)));

        });



    }

    function update(user){
        return {type: userConstants.PRESTIGE_UPDATE, user}
    }

}

function findUserWithHighestPrestige() {
    return new Promise((resolve, reject) => {
        let userList = store.getState().userList.users;

        userList.sort((a, b) => {
            if(a.totalPoints < b.totalPoints){
                return -1;
            }else{
                return 1;
            }
        })

        console.log('sorted array ', userList)
        resolve(userList[userList.length-1])

    });
}