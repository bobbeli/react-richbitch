import {userConstants} from '../_constants/userConstants';
import {userService} from '../_services/userService';
import {alertActions} from './alertActions';
import {history} from '../_helpers/history';
import firebase from '../_helpers/fire';

export const userActions = {
    login,
    updateUser,
    register,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));

        userService.login(username, password)
            .then((user) => {
                dispatch(success());
                history.push('/')

            }).catch((error) => {
                dispatch(failure(error.message));
        });
    }

    function request(user) { return {type: userConstants.LOGIN_REQUEST, user} }

    function success() { return {type: userConstants.LOGIN_SUCCESS} }

    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error} }
}


function updateUser(userUID) {
    console.log('called update func', userUID);

    return dispatch => {
        console.log('called update func 1', userUID);
        let userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            console.log('called update func 2', userUID);

            let user = {
                username: (snapshot.val() && snapshot.val().username) || 'Anonymous',
                lastname: (snapshot.val() && snapshot.val().lastname) || 'Anonymous',
                firstname: (snapshot.val() && snapshot.val().firstname) || 'Anonymous',
                email: (snapshot.val() && snapshot.val().email) || 'Anonymous'
            }

            dispatch({type: userConstants.USER_UPDATE, user});

        });


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
                    dispatch(update(user));
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

    function update(user) {
        return {type: userConstants.USER_UPDATE, user}
    }

}


