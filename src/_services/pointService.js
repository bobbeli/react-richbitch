import firebase from 'firebase'
import store from '../_helpers/store'
import {userActions} from '../_actions/userAction'
import {history} from "../_helpers/history";
export const pointService = {
    addPoints,
    updateTotalPoints,
    sumAllPoints
};


/**
 * Add Points
 * @param uid
 * @param amount
 */
function addPoints(amount) {

    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        if (user != null) {

            let newPoints = crateNewPointOnDB(user, amount);
            let updateTotal = updateTotalPoints(user);

            let storeObj = store.getState();
            if(storeObj.connectivity.isOnline){

                Promise.all([newPoints, updateTotal])
                    .then((res) =>{
                        store.dispatch(userActions.updateAllUsers());
                        resolve(res[1])
                        console.log('res ', res)
                    }).catch((err) => {
                    reject(err)
                })

            }else{
                reject('No Internet Connection')

            }


        }else {
            reject('No Internet Connection')
        }
    });
}

function crateNewPointOnDB(user, amount){
    return new Promise((resolve, reject) => {
        let pointsID = firebase.database().ref().child('points').push().key;

        firebase.database().ref('users/' + user.uid + '/points/' + pointsID).set({
            createdAd: Date.now(),
            amount: amount
        })
        .then(() => resolve(true))
        .catch((err) => reject(err))
    });
}

function updateTotalPoints(user){
    return new Promise((resolve, reject) => {

        let totalPointsSumUp = firebase.database().ref('users/' + user.uid + '/points');

        totalPointsSumUp.on('value', (snapshot) => {
            let points = snapshot.val();
            let totalPoints = 0;

            if(typeof points !== 'undefinded' || points !== null){
                Object.entries(points).map((point) => {
                    totalPoints = totalPoints + Number.parseInt(point[1].amount);
                });

                let updates = {};
                updates['/users/' + user.uid + '/totalPoints'] = totalPoints;

                try{
                    firebase.database().ref().update(updates);
                    resolve(totalPoints)
                }catch (err){
                    reject(err);
                }

            } else {
                reject('No Points')
            }



        });

    })

}

function sumAllPoints(user){
    let totalPointsSumUp = firebase.database().ref('users/' + user.uid + '/points');

    totalPointsSumUp.on('value', (snapshot) => {
        let points = snapshot.val();
        let totalPoints = 0;
        Object.entries(points).map((point) => {
            totalPoints = totalPoints + Number.parseInt(point[1].amount);
        });
        return totalPoints;
    });

}



