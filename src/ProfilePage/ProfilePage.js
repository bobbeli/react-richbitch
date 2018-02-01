import React from 'react';
import {connect} from 'react-redux';
import {List, Subheader, ListItem, Divider, FlatButton} from 'material-ui'
import ActionFace from 'material-ui/svg-icons/action/face';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import {userActions} from "../_actions/userAction";
import ReAuthHandler from "../_components/ReAuthHandler";
import Navigation from "../_components/Navigation";
import Delete from 'material-ui/svg-icons/action/delete';
import Back from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import {history} from '../_helpers/history';
import './ProfilePage.css'
import AnimatedWrapper from '../_helpers/AnimatedWrapper'




class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.deleteUser = this.deleteUser.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    deleteUser(event){
        this.setState({showModal: true})
    }

    handleBack(){
        history.push('/');
    }

    handleLogOut(){
        this.props.dispatch(userActions.logout())
    }

    render() {
        const {user, auth} = this.props;
        const style = {
            color: {
                color: 'white',
                background: 'white'
            }
        }
        return (
            <div>
                <List>
                    <Subheader>General</Subheader>

                    <ListItem
                        disabled={true}
                        leftIcon={<ActionFace color='white' />}
                        primaryText={user.username}
                        insetChildren={false}
                    />


                </List>
                <List>
                    <ListItem
                        disabled={true}
                        leftIcon={<CommunicationEmail color='white' />}
                        primaryText={user.email}
                    />
                </List>

                <div className="logoutButton">
                    <FlatButton
                        onClick={this.handleLogOut}
                        fullWidth={true}
                    >Logout</FlatButton>
                </div>

                <Navigation
                    left={
                        <IconButton
                            className="floatingButtonLeft"
                            fullWidth={false}
                            secondary={true}
                            onClick={this.handleBack}
                            tooltipPosition="bottom-center"
                            tooltip="Back to Home" >
                            <Back/>
                        </IconButton>
                    }
                    right={
                        <IconButton
                            className="floatingButtonRight"
                            onClick={this.deleteUser}
                            tooltipPosition="bottom-center"
                            tooltip="Delete Account">
                            <Delete/>
                        </IconButton>
                    }
                />

                {this.state.showModal || this.props.auth.reAuth ? <ReAuthHandler title="Re-Authenticate" text="Please provide Password for deleting User" button="delete" /> : null }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, auth} = state;
    return {
        user,
        auth
    }
}


export default AnimatedWrapper(connect(mapStateToProps)(ProfilePage));
