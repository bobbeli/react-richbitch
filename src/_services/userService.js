import firebase from 'firebase'

export const userService = {
    login,
    logout,
    register,
    update
};

function login(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                resolve(user);
            }).catch((error) => {
            reject(error);
        });

    });


}


function logout() {
    return new Promise((resolve, reject) =>{
        firebase.auth().signOut().then(function () {
            console.log('Successfully LogedOut')
            resolve(true)
        }).catch(function (error) {
            console.log('Error LogedOut')
            reject(error)
        });
    });

}

/**
 * Register User
 * @param user Object (username, email, password)
 * @returns {Promise.<TResult>}
 */
function register(user) {

    const {username, firstname, lastname, email, password} = user;

    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((objuser) => {

                let user = {
                    id: objuser.uid,
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                }

                writeUserData(user)

                resolve(user);

            })
            .catch((error) => {
                reject(Error(error));
            });
    });

}

function writeUserData(user) {
    firebase.database().ref('users/' + user.id).set({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
    });
}

/**
 * Update Local User Data
 */
function update() {
    return new Promise((resolve, reject) => {

        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value')
            .then((snapshot) => {
                let user = {
                    username: (snapshot.val() && snapshot.val().username) || 'Anonymous',
                    lastname: (snapshot.val() && snapshot.val().lastname) || 'Anonymous',
                    firstname: (snapshot.val() && snapshot.val().firstname) || 'Anonymous',
                    email: (snapshot.val() && snapshot.val().email) || 'Anonymous'
                }
                resolve(user);

            })
            .catch((error) => {
                reject(error);
            });
    });
}

