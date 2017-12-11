import { userConstants } from '../_constants/userConstants';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: 'pending'
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: 'fulfilled',
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: 'fail'
            };
        default:
            return state
    }
}