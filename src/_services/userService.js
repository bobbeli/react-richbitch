import firebase from 'firebase'

export const userService = {
    login,
    logout,
    register,
    update,
    deleteUser,
    reAuth,
    getAllUsers
};

/**
 * Login with E-Mail and Password
 *
 * Login User on FireBase Instance
 * @returns {Promise}
 */
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

/**
 * Logout User
 *
 * LogOut User on FireBase Instance
 * @returns {Promise} boolean
 */
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
 *
 * @param user Object (username, email, password)
 * @returns {Promise.<User>} User Object
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
                    email: email,
                    totalPoints: 0
                }
                writeUserData(user)
                resolve(user);
            })
            .catch((error) => {
                reject(Error(error));
            });
    });
}

/**
 * Write User to FireBase
 *
 * Writes a User Object to FireBase Server
 * @param User Object of User
 */
function writeUserData(user) {
    firebase.database().ref('users/' + user.id).set({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        totalPoints: user.totalPoints
    });
}

/**
 * Update User
 *
 * Update Local User Object
 * @returns {Promise} user Object
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
                    email: (snapshot.val() && snapshot.val().email) || 'Anonymous',
                    totalPoints: (snapshot.val() && snapshot.val().totalPoints) || 'Anonymous'
                }
                resolve(user);

            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Delete User
 *
 * Delete User FireBase Server.
 * @returns {Promise} boolean
 */
function deleteUser() {
    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;

        user.delete().then(function() {
            resolve(true)
        }).catch(function(error) {
            reject(error)
        });
    });
}

/**
 * Re Authenticate User
 *
 * @param userProvidedPassword
 * @returns {Promise} boolean
 */
function reAuth(userProvidedPassword){
    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            userProvidedPassword
        );

        user.reauthenticateWithCredential(credential).then(function() {
            resolve(true)
        }).catch(function(error) {
            reject(error)
        });
    })
}

/**
 * Get all Users
 *
 * ReQuest to FireBase Database
 * @returns {Promise} with all a List of all Users
 */
function getAllUsers(){
    return new Promise((resolve, reject) => {
        return firebase.database().ref('/users/').once('value')
            .then((snapshot) => {
                let userList = snapshot.val() || 'No Users';
                resolve(userList)
            }).catch((error) => {
                reject(error);
            });
    });
}
