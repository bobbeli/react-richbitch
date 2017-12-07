import { userConstants } from '../_constants/userConstants';
import { userService } from '../_services/userService';
import { alertActions } from './alertActions';
import { history } from '../_helpers/history';

export const userActions = {
    login,
    fetchUser
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function fetchUser() {
    return {
        type: 'FETCH_USERS_FULFILLED',
        payload: [
            {
                id: 1,
                name: 'Dimitri',
                age: 26,
            },
            {
                id: 2,
                name: 'Anja',
                age: 20,
            },
        ]
    }
}