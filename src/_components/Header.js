import React from 'react';
import {connect} from 'react-redux';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { ListItem, List , Subheader, Avatar} from 'material-ui';
import {userActions} from "../_actions/userAction";
import {history} from '../_helpers/history'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.profileListener = this.profileListener.bind(this);

    }

    logoutUser(event){
        this.props.dispatch(userActions.logout());
    }

    profileListener(event){
        history.push('/user');
    }


    render() {

        return (
            <div>
                <List>
                    <Subheader>Profile</Subheader>
                    <ListItem
                        leftAvatar={
                            <Avatar src={require('../_assets/img/user/user.jpg')} />
                        }
                        primaryText={this.props.user.username}
                        disableKeyboardFocus={false}
                        hoverColor="transparent"
                        onClick={this.profileListener}
                    />
                </List>
                 <Divider />

                    <List>

                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                        <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                    </List>
                    <Divider />
                    <List>
                        <ListItem
                            primaryText="Logout"
                            leftIcon={<ActionInfo />}
                            onClick={this.logoutUser}
                        />
                    </List>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const user = state.user;
    return {
        user
    }
}

export default connect(mapStateToProps)(Header);