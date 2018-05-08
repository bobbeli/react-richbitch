import {alertActions} from './alertActions';

export const connectivityActions = {
    setConnectivity,
    loadingStripe
};

function setConnectivity() {
    return dispatch => {

        if(navigator.onLine){
            dispatch(update(true));
        } else {
            dispatch(update(false));
            dispatch({type: 'LOADER_STOP'});
            dispatch(alertActions.error('You are Offline', 5000))
        }
    }

    function update(isOnline){
        return {type: 'SET_CONNECTIVITY', isOnline}
    }

}

function loadingStripe(){
    return dispatch => {


        let scriptTag = document.createElement('script');
        scriptTag.src = 'https://js.stripe.com/v3/';
        scriptTag.onload = function() {
            console.log('stripe is loaded')
            dispatch(update(true));

        };
        document.body.appendChild(scriptTag);
    }

    function update(isLoaded){
        return {type: 'STRIPE_LOADED', isLoaded}

    }

}
