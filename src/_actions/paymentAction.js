import {alertActions} from './alertActions';
import {paymentService} from "../_services/paymentService";
export const paymentActions = {
    init
};
function init() {
    return dispatch => {

        paymentService.init()
            .then((res) => {
                console.log('Server res', res.data)

            }).catch((error) => {
            dispatch(alertActions.error(error.message))

        });
    }
}