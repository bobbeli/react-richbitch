import {alertActions} from './alertActions';
import {paymentService} from "../_services/paymentService";
import {paymentConstants} from "../_constants/paymentConstants"
import {pointConstants} from "../_constants/pointConstants"
import {pointService} from "../_services/pointService";
export const paymentActions = {
    charge,
    updateAmount,
    updateStepper
};
function charge(token, amount, complete) {
    return dispatch => {
        paymentService.charge(token, amount)
            .then((res) => {
                if(res.status === 200){
                    dispatch(success(res.data));

                    if(typeof  complete !== 'undefined'){
                        complete('success');
                    }

                    dispatch(alertActions.success('Payment Successful'))

                    // Updating Local Points
                    pointService.addPoints(amount)
                        .then((res) => {
                            dispatch(update((res)));
                            dispatch(alertActions.success('Your Amount has been updated'));
                        }).catch((error) => {
                            dispatch(alertActions.error(error))
                    });

                } else {
                    if(typeof  complete !== 'undefined'){
                        complete('fail');
                    }
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

    function update(totalPoints){
        return {type: pointConstants.TOTAL_POINTS_UPDATE, totalPoints}
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

function updateAmount(amount, price) {
    return dispatch => {
        dispatch(update(amount, price));
    };

    function update(amount, price) {
        return {type: paymentConstants.AMOUNT_CHANGED, amount, price}
    }
}


