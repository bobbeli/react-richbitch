import React from 'react';
import {connect} from 'react-redux';
import {List, Subheader, ListItem, Toggle} from 'material-ui'
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
import LogoutButton from "./LogoutButton";
import {pushActions} from "../_actions/pushActions";
import isPushApiSupported from "../_helpers/PushApiChecker";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.deleteUser = this.deleteUser.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handlePushNotifications = this.handlePushNotifications.bind(this);
    }

    deleteUser(event){
        this.setState({showModal: true})
    }

    handleBack(){
        history.push('/home');
    }

    handleLogOut(){
        this.props.dispatch(userActions.logout())
    }

    handlePushNotifications(event, isNotChecked){
        if(isNotChecked){
            this.props.dispatch(pushActions.unsubscribePushNotifications())
        }else{
            this.props.dispatch(pushActions.subscribePushNotifications())
        }
    }

    render() {
        const {user, auth, push} = this.props;
        const style = {
            color: {
                color: 'white',
                background: 'white'
            }
        }

        let pushToken = user.pushToken ? true : false;
        let pushSupported = isPushApiSupported();


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


                {/*
                <List>
                    <Subheader>Spendings</Subheader>

                    <ListItem
                        disabled={true}
                        primaryText={this.props.user.totalPoints +' Prestige'}
                        secondaryText="Your Prestige Value "

                    />
                    <ListItem
                        disabled={true}
                        primaryText={'ToDo $'}
                        secondaryText="Total Amount you've spent so far. "
                    />

                </List>

                */}



                <List>
                    <Subheader>Notifications</Subheader>
                    <ListItem>
                        <Toggle
                            label="Push Notifications"
                            defaultToggled={!pushToken}
                            onToggle={this.handlePushNotifications}
                            disabled={!pushSupported}
                        />
                        {
                            !pushSupported ?
                                <p>Your Browser doesnt Support Push Notifications</p>
                                :
                                null
                        }
                    </ListItem>
                </List>





                <Navigation
                    left={
                        <IconButton
                            className="floatingButtonLeft"
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

                    top={<LogoutButton handleLogOut={this.handleLogOut} />}
                />

                {this.state.showModal || this.props.auth.reAuth ? <ReAuthHandler title="Re-Authenticate" text="Please provide Password for deleting User" button="delete" /> : null }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, auth, push} = state;
    return {
        user,
        auth,
        push
    }
}


export default AnimatedWrapper(connect(mapStateToProps)(ProfilePage));
