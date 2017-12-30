import firebase from 'firebase';
import {userActions} from '../_actions/userAction'
import {history} from './history';
import store from './store'
import {userConstants} from '../_constants/userConstants'

const firebaseConfig = {
    apiKey: "AIzaSyA2kuyJIWakmM8x7S08ERWhj5O3WolPdGU",
    authDomain: "richbitch-4fc7a.firebaseapp.com",
    databaseURL: "https://richbitch-4fc7a.firebaseio.com",
    projectId: "richbitch-4fc7a",
    storageBucket: "richbitch-4fc7a.appspot.com",
    messagingSenderId: "964894129974"
};


firebase.initializeApp(firebaseConfig);




firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('called on auth State changed');
        store.dispatch(userActions.update());
        store.dispatch({type: userConstants.LOGIN_SUCCESS});
        /*
        let userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {

            let user = {
                username: (snapshot.val() && snapshot.val().username) || 'Anonymous',
                lastname: (snapshot.val() && snapshot.val().lastname) || 'Anonymous',
                firstname: (snapshot.val() && snapshot.val().firstname) || 'Anonymous',
                email: (snapshot.val() && snapshot.val().email) || 'Anonymous'
            }
            store.dispatch({type: userConstants.USER_UPDATE, user});

           history.push('/')

        });*/


    } else {
        // No user is signed in.
        console.log('user is signed out ', user)
        store.dispatch({type: userConstants.LOGOUT});
        history.push('/login')
    }
});


export const updateUserMiddleware = store => next => action => {
    console.log("Middleware triggered:", action);
    //next(action);
}

