import { alertConstants } from '../_constants/alertConstants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message, duration ) {
    let notify = {message, duration}
    return { type: alertConstants.SUCCESS, notify };
}

function error(message, duration) {
    let notify = {message, duration}
    return { type: alertConstants.ERROR, notify };
}

function clear() {
    return { type: alertConstants.CLEAR };
}