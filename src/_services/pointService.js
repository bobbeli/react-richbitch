import firebase from 'firebase'


export const pointService = {
    addPoints,
    updateTotalPoints,
    sumAllPoints
};


/**
 * Add
 * @param uid
 * @param amount
 */
function addPoints(amount) {

    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        if (user != null) {

            let newPoints = crateNewPointOnDB(user, amount);
            let updateTotal = updateTotalPoints(user);

            Promise.all([newPoints, updateTotal])
                .then((res) =>{
                    resolve(res[1])
                }).catch((err) => {
                    reject(err)
                })
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
        let totalPoints = sumAllPoints(user);
        let updates = {};
        updates['/users/' + user.uid + '/totalPoints'] = totalPoints;

        if(typeof totalPoints !== 'undefined' && typeof totalPoints !== 'undefined'){
            try{
                firebase.database().ref().update(updates);
                resolve(totalPoints)
            }catch (err){
                reject(err);
            }
        }else{
            reject('Could not update TotalPoints on Firebase DB');
        }
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



