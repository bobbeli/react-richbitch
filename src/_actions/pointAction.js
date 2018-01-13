import {alertActions} from './alertActions';
import {pointConstants} from "../_constants/pointConstants"
import {pointService} from "../_services/pointService";
export const pointActions = {
    addPoint,
};
function addPoint(amount) {
    return dispatch => {
        pointService.addPoints(amount)
            .then((res) => {
                dispatch(update((res)));
            }).catch((error) => {
                dispatch(alertActions.error(error))
        });
    }

    function update(totalPoints){
        return {type: pointConstants.TOTAL_POINTS_UPDATE, totalPoints}
    }

}