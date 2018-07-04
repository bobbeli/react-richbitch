import {messaging} from '../_helpers/firebaseDB'
import axios from 'axios'
import {defaultConstants} from "../_constants/defaultConstants";

export const pushService = {
    subscribe,
    requestPermission,
    unsubscribe,
};

/**
 * Register Push Notifications
 *
 * @returns {Promise}
 */
function subscribe(uid) {
    return new Promise((resolve, reject) => {

        messaging.getToken().then(function(currentToken) {
            if (currentToken) {
                axios.post(defaultConstants.API_PATH + '/push/subscribe',
                    {
                        uid: uid,
                        token: currentToken
                    })
                    .then((res) => {
                        resolve(currentToken);
                    }).catch((err) => {
                        reject(err);
                })
            } else {
                // Show permission request.
                // Show permission UI.
                console.log('NO Instance ID token available');
                reject("NO Instance ID token available")
            }
        }).catch(function(err) {
            console.log('super fail', err)
            reject(err)
        });
    });
}

function requestPermission(){
    return new Promise((resolve, reject) => {

        messaging.requestPermission().then(function() {
            console.log('Notification permission granted.');
            resolve(true);
        }).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
            reject(err);
        });
    });
}

function unsubscribe(uid){
    return new Promise((resolve, reject) => {
        axios.post(defaultConstants.API_PATH + '/push/unsubscribe',
            {
                uid: uid,
            })
            .then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
        })
    });
}
