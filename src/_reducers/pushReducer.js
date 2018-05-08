import {pushConstants} from "../_constants/pushConstants"

export default function reducer(state = {
    failure: false,
    fetching: false,
    fetched: false,
    token: null,
}, action) {
    switch (action.type) {
        case pushConstants.PUSH_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                failure: false,
                fetching: true,
                fetched: false,
                pushEnabled: false,
            };
        case pushConstants.PUSH_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                failure: false,
                fetching: false,
                fetched: true,
                pushEnabled: true,
                token: action.token,
            };
        case pushConstants.PUSH_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                failure: true,
                fetching: false,
                fetched: true,
                pushEnabled: false,
            };

        case pushConstants.PUSH_UNSUBSCRIPTION_REQUEST:
            return {
                ...state,
                failure: false,
                fetching: true,
                fetched: false,
                pushEnabled: true,
            };

        case pushConstants.PUSH_UNSUBSCRIPTION_SUCCESS:
            return {
                ...state,
                failure: false,
                fetching: false,
                fetched: true,
                pushEnabled: false,
                token: null,
            };

        case pushConstants.PUSH_UNSUBSCRIPTION_FAILURE:
            return {
                ...state,
                failure: true,
                fetching: false,
                fetched: true,
                pushEnabled: true,
            };


        default:
            return state
    }
}
