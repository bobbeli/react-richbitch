import firebase from 'firebase'


export const pointService = {
    addPoints,
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
            // A post entry.
            let pointsID = firebase.database().ref().child('points').push().key;
            try {
                firebase.database().ref('users/' + user.uid + '/points/' + pointsID).set({
                    createdAd: Date.now(),
                    amount: amount
                });
                resolve(true);
            }
            catch (err) {
                reject(false);
            }


        } else {
            reject(false);
        }
    });


}


