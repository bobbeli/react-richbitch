import {alertActions} from './alertActions';
import {paymentService} from "../_services/paymentService";
import {paymentConstants} from "../_constants/paymentConstants"
export const paymentActions = {
    charge
};
function charge(token, amount) {
    return dispatch => {
        dispatch(request());
        paymentService.charge(token, amount)
            .then((res) => {
                console.log('Charge Requets Res', res.data)
                dispatch(success(res.data))
                //dispatch(alertActions.success(res.data))
            }).catch((error) => {
                dispatch(alertActions.error(error.message))
                dispatch(failure(error.message))
            });
    }

    function request() {
        return {type: paymentConstants.PAYMENT_REQUEST}
    }

    function success(token) {
        return {type: paymentConstants.PAYMENT_SUCCESS, token}
    }

    function failure(error) {
        return {type: paymentConstants.PAYMENT_FAILURE, error}
    }
}