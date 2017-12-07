import {authHeader} from '../_helpers/authHeader';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch('/users/authenticate', requestOptions)
        .then(handleRequest)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

/**
 * Register User
 * @param user Object (username, email, password)
 * @returns {Promise.<TResult>}
 */
function register(user) {

    const {username, email, password} = user;

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions)
        .then(handleRequest);
}

/**
 * Helper Function for response of requets
 * @param response object with values from response
 * @returns json with response of Server
 */
function handleRequest(response){
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}