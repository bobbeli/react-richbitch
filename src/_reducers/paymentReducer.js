import {paymentConstants} from "../_constants/paymentConstants"

export default function reducer(state = {
    id: null,
    amount: 1.00,
    fetching: false,
    fetched: false,
    error: null,
    stepperIndex: 0,
    stepperFinished: false,
},  action) {
    switch (action.type) {
        case paymentConstants.PAYMENT_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null,
                stepperFinished: false,
                stepperIndex:1,
                amount: state.amount,
            };
        case paymentConstants.PAYMENT_SUCCESS:
            return {
                ...state,
                id: action.token.id,
                fetching: false,
                fetched: true,
                error: null,
                amount: action.token.amount,
                stepperFinished: false,
                stepperIndex:2,
            };
        case paymentConstants.PAYMENT_FAILURE:
            return {
                ...state,
                amount: state.amount,
                fetching: false,
                fetched: true,
                error: action.error,
                stepperIndex:1,
                stepperFinished: false,
            };
        case paymentConstants.STEPPER_CHANGED:
            return {
                ...state,
                amount: state.amount,
                fetching: false,
                fetched: false,
                stepperFinished: false,
                stepperIndex: action.index,
            };
        case paymentConstants.STEPPER_FINISHED:
            return {
                ...state,
                amount: 1,
                stepperFinished:true,
                fetching: false,
                fetched: false,
                stepperIndex: 0,
            };
        case paymentConstants.AMOUNT_CHANGED:
            return {
                ...state,
                amount: action.amount,
                fetching: false,
                fetched: false,
                stepperIndex:0,
            };
        default:
            return state
    }
}
