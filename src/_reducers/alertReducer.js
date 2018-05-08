import {alertConstants} from "../_constants/alertConstants"

export default function reducer(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                ...state,
                type: 'alert-success',
                message: action.notify.message,
                duration: action.notify.duration
            };
        case alertConstants.ERROR:
            return {
                ...state,
                type: 'alert-danger',
                message: action.notify.message,
                duration: action.notify.duration
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}
