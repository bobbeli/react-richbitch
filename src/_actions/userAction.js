import {userConstants} from '../_constants/userConstants';
import {userService} from '../_services/userService';
import {alertActions} from './alertActions';
import {history} from '../_helpers/history';
import firebase from 'firebase'

export const userActions = {
    login,
    register,
    logout,
    update,
    registerGoogle,
    deleteUser,
    reAuthUser,
};

function login(username, password) {
    return dispatch => {
        dispatch(request());

        userService.login(username, password)
            .then((user) => {
                dispatch(success());
                dispatch(this.update())
                history.push('/')

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

function register(user) {
    return dispatch => {
        dispatch(request({user}));

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

function registerGoogle() {
    return dispatch => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            // ToDo Handle Google Register
        }).catch(function(error) {
            dispatch(alertActions.error(error.message))
            dispatch(failure(error.message));

        });

        function failure(error) {
            return {type: userConstants.REGISTER_FAILURE, error}
        }
    }

}

/**
 * Update Local User Storage from Firebase
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
 */
function deleteUser() {

    return dispatch => {

        userService.deleteUser().then((res) => {
            if(res){
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
 * @param userProvidedPassword
 * @returns {function(*)}
 */
function reAuthUser(userProvidedPassword){
    return dispatch => {
        dispatch(request());
        userService.reAuth(userProvidedPassword).then((res) => {
            if(res){
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


