import React from 'react';
import {connect} from 'react-redux';
import Header from '../_components/Header/Header'
import {List, Subheader, FlatButton, ListItem, Divider} from 'material-ui'
import ActionFace from 'material-ui/svg-icons/action/face';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import {userActions} from "../_actions/userAction";
import ReAuthHandler from "../_components/ReAuthHandler";



class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(event){
        event.preventDefault();
        this.props.dispatch(userActions.deleteUser())
    }

    render() {
        const {user, unregister} = this.props;

        return (
            <div>
                <Header title="Profile"/>
                <List>
                    <Subheader>General</Subheader>

                    <ListItem
                        disabled={true}
                        leftIcon={<ActionFace />}
                        primaryText={user.username}
                        secondaryText="Username"
                        insetChildren={false}
                    />


                </List>
                <Divider inset={true} />
                <List>
                    <ListItem
                        leftIcon={<CommunicationEmail />}
                        primaryText={user.email}
                        secondaryText="E-Mail"
                    />
                </List>

                <FlatButton label="Delete Account" fullWidth={true} secondary={true} onClick={this.deleteUser} />
                {unregister.reAuth && <ReAuthHandler title="Re-Authenticate" text="Please provide Password for deleting User" button="delete" /> }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, unregister} = state;
    return {
        user,
        unregister
    }
}

export default connect(mapStateToProps)(ProfilePage);