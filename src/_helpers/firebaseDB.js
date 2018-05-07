import firebase from 'firebase';
import {userActions} from '../_actions/userAction'
import {history} from './history';
import store from './store'
import {userConstants} from '../_constants/userConstants'
import {userService} from '../_services/userService';
import {alertActions} from "../_actions/alertActions"
import {prestigeActions} from "../_actions/prestigeAction"


const firebaseConfig = {
    apiKey: "AIzaSyA2kuyJIWakmM8x7S08ERWhj5O3WolPdGU",
    authDomain: "richbitch-4fc7a.firebaseapp.com",
    databaseURL: "https://richbitch-4fc7a.firebaseio.com",
    projectId: "richbitch-4fc7a",
    storageBucket: "richbitch-4fc7a.appspot.com",
    messagingSenderId: "964894129974"
};


firebase.initializeApp(firebaseConfig);


/**
 * Result of Social Media Register / Login Request
 */
firebase.auth().getRedirectResult().then((result) => {

    if (result.user !== null ) {
        store.dispatch({type: 'LOADER_STOP'});


        userService.registerWithSocialLogin(result.user)
            .then(user => {
                    console.log('social media successfull redirect to Home')
                    //store.dispatch({type: userConstants.LOGIN_SUCCESS});
                    store.dispatch(userActions.updateAllUsers())
                    history.push('/')
                },
                error => {
                    store.dispatch({type: userConstants.LOGIN_FAILURE});
                    store.dispatch(alertActions.error(error.message))
                });

    } else {
        store.dispatch({type: 'LOADER_STOP'});
        let storeObj = store.getState();
        if(storeObj.auth.loggingIn){
            history.push('/')
        }else{
            history.push('/login')

        }

    }


    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        store.dispatch({type: 'LOADER_STOP'});
        store.dispatch({type: userConstants.LOGIN_FAILURE});
        store.dispatch(alertActions.error(error.message))

    });


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('user state changed ', user)
        store.dispatch(userActions.updateAllUsers())
        store.dispatch({type: userConstants.LOGIN_SUCCESS});
        history.push('/')

    } else {
        // No user is signed in.
        console.log('user is signed out ', user)
        store.dispatch({type: userConstants.LOGOUT});
        history.push('/login')
    }
});

/**
 * Listen to User changes on Firebase DB
 * @type {firebase.database.Reference}
 */
var ref = firebase.database().ref("users");
firebase.database().ref().on('value', (snapshot) => {
    console.log('User Data changed ', snapshot)
    store.dispatch(userActions.updateAllUsers());

});


export const updateLoaderMiddleware = store => next => action => {
    const {payment, auth, registration, unregister, user, userList} = store.getState();

    if(payment.fetching || auth.fetching || registration.fetching || unregister.fetching
        || user.fetching || userList.fetching){

    }
    next(action);
}

export const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    store.dispatch(alertActions.success(payload.notification.body))



});

messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
        // Todo handle refresh Token
        console.log('Token refreshed by firebase');
    }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
    });
});



