import * as firebase from "firebase";
import {userActions} from '../_actions/userAction';

let config = {
    apiKey: "AIzaSyA2kuyJIWakmM8x7S08ERWhj5O3WolPdGU",
    authDomain: "richbitch-4fc7a.firebaseapp.com",
    databaseURL: "https://richbitch-4fc7a.firebaseio.com",
    projectId: "richbitch-4fc7a",
    storageBucket: "richbitch-4fc7a.appspot.com",
    messagingSenderId: "964894129974"
};
let fire = firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userActions.updateUser(user.uid)

    } else {
        console.log('Not logged in user', user)

        // No user is signed in.
    }
});
export default fire;

