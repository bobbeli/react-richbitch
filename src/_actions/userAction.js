import {userConstants} from '../_constants/userConstants';
import {userService} from '../_services/userService';
import {alertActions} from './alertActions';
import {history} from '../_helpers/history';
import firebase from 'firebase'

export const userActions = {
    login,
    register,
    logout,
    update
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


function logout() {
    userService.logout();
    return {type: userConstants.LOGOUT}

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


