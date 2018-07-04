import React from 'react';
import {Toggle} from 'material-ui'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from "react-redux";
import {userConstants} from "../../_constants/userConstants";
import isPushApiSupported from "../../_helpers/PushApiChecker";
import {pushActions} from "../../_actions/pushActions";
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class IntroModal extends React.Component {

    constructor(){
        super();
        this.handlePushNotifications = this.handlePushNotifications.bind(this);
    }


    handleClose = () => {
        this.props.dispatch({type: userConstants.DISABLE_HELPER_MODAL});
    };

    handlePushNotifications(event, isNotChecked){
        if(isNotChecked){
            this.props.dispatch(pushActions.unsubscribePushNotifications())
        }else{
            this.props.dispatch(pushActions.subscribePushNotifications())
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        let pushSupported = isPushApiSupported();

        return (
            <div>
                <Dialog
                    title="Welcome to Prestige."
                    actions={actions}
                    modal={true}
                    open={this.props.user.showHelperModal}

                >
                    Buy Prestige and show your Friends who's the real Champion.<br /><br />
                    Money is nothing until its Prestige. So let's get started.

                    <h4>Push Notifications</h4>
                    Get informed about the latest Activities on Prestige.
                    <br />
                    <br />
                    <Toggle
                        label="Push"
                        defaultToggled={true}
                        onToggle={this.handlePushNotifications}
                        disabled={!pushSupported}
                    />
                    {
                        !pushSupported ?
                            <p>Your Browser doesn't Support Push Notifications</p>
                            :
                            null
                    }
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user} = state;
    return {
        user
    }
}

export default connect(mapStateToProps)(IntroModal);
