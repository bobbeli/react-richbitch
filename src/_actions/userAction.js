import {userConstants} from '../_constants/userConstants';
import {userService} from '../_services/userService';
import {alertActions} from './alertActions';
import {history} from '../_helpers/history';
import firebase from 'firebase'
import {prestigeActions} from "./prestigeAction"

export const userActions = {
    login,
    register,
    logout,
    update,
    registerGoogle,
    registerFacebook,
    registerTwitter,
    deleteUser,
    reAuthUser,
    updateAllUsers,
    userprofileExist,
};

function login(username, password) {
    return dispatch => {
        dispatch(request());

        userService.login(username, password)
            .then((user) => {
                dispatch(success());
                dispatch(this.update())
                history.push('/');

            }).catch((error) => {
            dispatch(failure());
            dispatch(alertActions.error(error.message))

        });
    }

    function request() {
        return {type: userConstants.LOGIN_REQUEST}
    }

    function success() {
        return {type: userConstants.LOGIN_SUCCESS}
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE}
    }
}

/**
 * Logout
 *
 * Logout User and Delets local Store user Object
 * Logout From FireBase Auth
 * @returns {function(*)}
 */
function logout() {
    return dispatch => {
        userService.logout()
            .then(
                res => {
                    dispatch(logout())
                    dispatch(logoutUser())
                },
                error => {
                    dispatch(alertActions.error(error.message))
                });
    };

    function logout() {
        return {type: userConstants.LOGOUT}
    }

    function logoutUser() {
        return {type: userConstants.LOGOUT_USER}
    }

}

/**
 * Register E-Mail
 *
 * Register new User and update local Store user Object
 * Redirect to HomePage (/)
 * @returns {function(*)}
 */
function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/')
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message))
                })
    };

    function request() {
        return {type: userConstants.REGISTER_REQUEST}
    }

    function success() {
        return {type: userConstants.REGISTER_SUCCESS}
    }

    function failure(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }

}

/**
 * Register Google Account
 *
 * Register new User and update local Store user Object
 * Redirect to HomePage (/)
 * @returns {function(*)}
 */
function registerGoogle() {
    return dispatch => {
        dispatch({type: userConstants.LOGIN_REQUEST});

        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider)
            .catch((err) => {
                dispatch(failure(err.message));
                dispatch(alertActions.error(err.message, 3500));
            });
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }

}

/**
 * Register Facebook Account
 *
 * Register new User and update local Store user Object
 * Redirect to HomePage (/)
 * @returns {function(*)}
 */
function registerFacebook() {
    return dispatch => {
        dispatch({type: userConstants.LOGIN_REQUEST});

        let provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithRedirect(provider)
            .catch((err) => {
                    dispatch(failure(err.message));
                    dispatch(alertActions.error(err.message, 3500));
            });
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }

}


/**
 * Register Twitter Account
 *
 * Register new User and update local Store user Object
 * Redirect to HomePage (/)
 * @returns {function(*)}
 */
function registerTwitter() {
    return dispatch => {
        dispatch({type: userConstants.LOGIN_REQUEST});

        let provider = new firebase.auth.TwitterAuthProvider();

        firebase.auth().signInWithRedirect(provider)
            .catch((err) => {
                    dispatch(failure(err.message));
                    dispatch(alertActions.error(err.message, 3500));
                });
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }

}



/**
 * Update User
 *
 * Local User Storage from Firebase will be updated
 */
function update() {
    return dispatch => {
        userService.update().then(user => {
            dispatch(update(user));
            dispatch(success());
            history.push('/')
        }, error => {
            dispatch(failure())
            dispatch(alertActions.error(error.message))
        });

    };

    function update(user) {
        return {type: userConstants.USER_UPDATE, user}
    }

    function success() {
        return {type: userConstants.LOGIN_SUCCESS}
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE}
    }
}

/**
 * Delete User
 *
 * Delete User on Firebase, and Local, Logout user
 */
function deleteUser() {
    return dispatch => {

        userService.deleteUser().then((res) => {
            if (res) {
                dispatch(request());
                dispatch(logout());
                dispatch(success());
                history.push('/')
            }

        }, error => {

            dispatch(failure(error))
            dispatch(alertActions.error(error.message))
        });

    };

    function logout() {
        return {type: userConstants.LOGOUT_USER}
    }

    function request() {
        return {type: userConstants.DELETE_REQUEST}
    }

    function success() {
        return {type: userConstants.DELETE_SUCCESS}
    }

    function failure(error) {
        return {type: userConstants.DELETE_FAILURE, error}
    }

}

/**
 * Re Authenticate User
 *
 *
 * @param userProvidedPassword
 * @returns {function(*)}
 */
function reAuthUser(userProvidedPassword) {
    return dispatch => {
        dispatch(request());
        userService.reAuth(userProvidedPassword).then((res) => {
            if (res) {
                dispatch(success())
            }
        }, error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error.message))
        });
    }

    function failure(error) {
        return {type: userConstants.RE_AUTH_FAILURE, error}
    }

    function success() {
        return {type: userConstants.RE_AUTH_SUCCESS}
    }

    function request() {
        return {type: userConstants.RE_AUTH_REQUEST}
    }
}

/**
 * Get all Users
 *
 * Load user List from FireBase RealTime DB.
 * @returns Array of Users
 */
function updateAllUsers() {
    return dispatch => {
        dispatch(request());

        userService.getAllUsers().then((res) => {
            if (res) {
                let users = listToArray(res);

                // ReCalc Prestige Value for Users
                dispatch(prestigeActions.calcPrestige(users));
                dispatch(success(users));


                // Update Local User Obj.
                let currentUser = users.find(getLocalUser);
                if(typeof currentUser !== 'undefined'){
                    dispatch(update(currentUser));
                }

                // Update Rank of User
                let rank = users.length;
                let temp = 0;
                for (var [key, value] of users.entries()) {
                    temp = temp + 1;
                    if(value.email === firebase.auth().currentUser.email){
                        rank = temp;
                    }
                }

                dispatch(updateRank(rank))

            }
        }, error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error.message))
        });
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function update(user){
        return {type: userConstants.USER_UPDATE, user}
    }

    function updateRank(rank){
        return {type: userConstants.RANK_UPDATE, rank}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

}

function listToArray(users){
    let usersArray = [];

    Object.entries(users).map((user) => {
        let newUser = {
            id: user[0],
            firstname: user[1].firstname,
            lastname: user[1].lastname,
            username: user[1].username,
            totalPoints: user[1].totalPoints,
            email: user[1].email,
            pushToken: user[1].pushToken,
        };
        usersArray.push(newUser);
    });
    return usersArray;
}

function getLocalUser(user){
    return user.email == firebase.auth().currentUser.email
}

function userprofileExist(email){
    return dispatch => {
        dispatch({type: 'LOADER_START'});

        firebase.auth().fetchProvidersForEmail(email)
            .then((userIDs) => {
                if(userIDs.length > 0){

                    firebase.auth().sendPasswordResetEmail(email).then(function() {
                        dispatch(alertActions.success('You have received a password reset Mail.'))
                        dispatch(success());
                        dispatch({type: 'LOADER_STOP'});

                    }).catch(function(error) {
                        dispatch(failure());
                        dispatch(alertActions.error('Something went wrong. Try again later.'))
                        dispatch({type: 'LOADER_STOP'});

                    });

                }else {
                    dispatch(failure());
                    dispatch(alertActions.error(email + ' does not exist'))
                    dispatch({type: 'LOADER_STOP'});


                }
            }).catch((err) => {
                dispatch(failure());
                dispatch(alertActions.error(err.message));
                dispatch({type: 'LOADER_STOP'});

        })
    }

    function success() {
        return {type: userConstants.USER_EMAIL_EXIST_SUCCESS}
    }

    function failure() {
        return {type: userConstants.USER_EMAIL_EXIST_FAILURE}
    }
}
