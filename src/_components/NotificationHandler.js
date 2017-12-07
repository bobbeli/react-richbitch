import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class NotificationHandler extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
        };
    }


    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.props.alert.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    className={this.props.alert.type}
                />
            </div>
        );
    }
}