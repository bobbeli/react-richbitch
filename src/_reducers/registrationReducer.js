import { userConstants } from '../_constants/userConstants';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                registering: 'pending'
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                registering: 'fulfilled',
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registering: 'fail'
            };
        default:
            return state
    }
}