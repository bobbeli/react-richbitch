import firebase from '../_helpers/fire'

export const userService = {
    login,
    logout,
    register,
};

function login(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                resolve(user);
            }).catch((error) => {
            // Handle Errors here.
                reject(error);
        });
    });


}


function logout() {
    // remove user from local storage to log user out
    firebase.auth().signOut().then(function () {
        console.log('Successfully LogedOut')
    }).catch(function (error) {
        console.log('Error LogedOut')
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

