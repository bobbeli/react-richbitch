import {alertActions} from './alertActions';
import {userConstants} from "../_constants/userConstants"
import store from '../_helpers/store'

export const prestigeActions = {
    calcPrestige,
};

function calcPrestige(users) {
    return dispatch => {

        findUserWithHighestPrestige(users).then((users)=> {
                dispatch(update(users[0]));
        }, (error) => {
            console.log(error);
        });


    }

    function update(user){
        return {type: userConstants.PRESTIGE_UPDATE, user}
    }


}

function findUserWithHighestPrestige(usersArray) {
    return new Promise((resolve, reject) => {
        usersArray.sort((a, b) => {
            if(a.totalPoints < b.totalPoints){
                return 1;
            }else{
                return -1;
            }
        })

        if(usersArray.length < 1){
            reject('No Data')
        }else{
            resolve(usersArray)
        }

    });
}