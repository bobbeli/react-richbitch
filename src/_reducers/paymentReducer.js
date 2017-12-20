import {paymentConstants} from "../_constants/paymentConstants"

export default function reducer(state = {
    id: null,
    amount: null,
    fetching: false,
    fetched: false,
    error: null,
},  action) {
    switch (action.type) {
        case paymentConstants.PAYMENT_REQUEST:
            return {
                fetching: true,
                fetched: false,
                error: null,
            };
        case paymentConstants.PAYMENT_SUCCESS:
            console.log('payment success', action);
            return {
                fetching: false,
                fetched: true,
                error: null,
                amount: action.amount
            };
        case paymentConstants.PAYMENT_FAILURE:
            return {
                fetching: false,
                fetched: true,
                error: action.error,
            };
        default:
            return state
    }
}
