import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux'
import {alertActions} from "../../_actions/alertActions";
import './Notification.css'

class NotificationHandler extends React.Component {
    constructor(props){
        super(props);
    }

    handleRequestClose = () => {
        this.props.dispatch(alertActions.clear())
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={true}
                    message={this.props.alert.message}
                    autoHideDuration={1500}
                    onRequestClose={this.handleRequestClose}
                    className={this.props.alert.type}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,
    }
}

export default connect(mapStateToProps)(NotificationHandler);