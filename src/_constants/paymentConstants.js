export const paymentConstants = {
   // API_PATH: 'http://localhost:5000/richbitch-4fc7a/us-central1/app',
    API_PATH: 'https://us-central1-richbitch-4fc7a.cloudfunctions.net/app',
    API_PATH_LIVE: 'https://warm-cliffs-27450.herokuapp.com/payment',


    PAYMENT_REQUEST: 'USERS_PAYMENT_REQUEST',
    PAYMENT_SUCCESS: 'USERS_PAYMENT_SUCCESS',
    PAYMENT_FAILURE: 'USERS_PAYMENT_FAILURE',

    STEPPER_FINISHED: 'PAYMENT_STEPPER_FINISHED',
    STEPPER_CHANGED: 'PAYMENT_STEPPER_CHANGED',

    AMOUNT_CHANGED: 'PAYMENT_AMOUNT_CHANGED'
};