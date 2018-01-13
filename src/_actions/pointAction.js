import {alertActions} from './alertActions';
import {pointConstants} from "../_constants/pointConstants"
import {pointService} from "../_services/pointService";
import {userActions} from "./userAction";
export const pointActions = {
    addPoint,
};
function addPoint(amount) {
    return dispatch => {
        if(amount < 1){
            dispatch(alertActions.error('Amount must be greater than 1'))
        } else {
            pointService.addPoints(amount)
                .then((res) => {
                    dispatch(update((res)));
                    dispatch(userActions.getAllUsers())
                    dispatch(alertActions.success('Congrats, your new Amount is: ' + res));
                }).catch((error) => {
                    dispatch(alertActions.error(error))
            });
        }
    }

    function update(totalPoints){
        return {type: pointConstants.TOTAL_POINTS_UPDATE, totalPoints}
    }

}