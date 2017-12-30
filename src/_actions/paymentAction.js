import {alertActions} from './alertActions';
import {paymentService} from "../_services/paymentService";
import {paymentConstants} from "../_constants/paymentConstants"
import {pointService} from "../_services/pointService";
export const paymentActions = {
    charge,
    updateAmount,
    updateStepper
};
function charge(token, amount) {
    return dispatch => {
        paymentService.charge(token, amount)
            .then((res) => {
                if(res.status === 200){
                    dispatch(success(res.data))
                    pointService.addPoints(amount);
                    dispatch(alertActions.success('Payment Successful'))
                } else {
                    dispatch(alertActions.error(res.data))
                }
            }).catch((error) => {
                dispatch(alertActions.error(error.response.data.message))
                dispatch(failure(error.response.data.message))
            });
    }

    function success(token) {
        return {type: paymentConstants.PAYMENT_SUCCESS, token}
    }

    function failure(error) {
        return {type: paymentConstants.PAYMENT_FAILURE, error}
    }
}

function updateStepper(index){
    return dispatch => {
        dispatch(changed(index));
    };

    function changed(index) {
        return {type: paymentConstants.STEPPER_CHANGED, index}
    }

}

function updateAmount(amount) {
    return dispatch => {
        dispatch(update(amount));
    };

    function update(amount) {
        return {type: paymentConstants.AMOUNT_CHANGED, amount}
    }
}