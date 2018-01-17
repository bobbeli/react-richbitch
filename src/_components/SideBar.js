import React from 'react';
import {connect} from 'react-redux';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {ListItem, List, Subheader, Avatar} from 'material-ui';
import {userActions} from "../../_actions/userAction";
import {history} from '../../_helpers/history'
import {AppBar, Drawer} from 'material-ui';


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSidebar: false
        };

        this.logoutUser = this.logoutUser.bind(this);
        this.profileListener = this.profileListener.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);

    }

    logoutUser(event) {
        this.props.dispatch(userActions.logout());
    }

    profileListener(event) {
        history.push('/user');
    }

    toggleDrawer() {
        this.setState({
            openSidebar: !this.state.openSidebar
        });
    }

    closeDrawer(){
        this.setState({
            openSidebar: false
        });
    }


    render() {

        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.openSidebar}
                    onRequestChange={this.closeDrawer}
                >

                    <List>
                        <Subheader>Profile</Subheader>
                        <ListItem
                            leftAvatar={
                                <Avatar src={require('../../_assets/img/user/user.jpg')}/>
                            }
                            primaryText={this.props.user.username}
                            disableKeyboardFocus={false}
                            hoverColor="transparent"
                            onClick={this.profileListener}
                        />
                    </List>
                    <Divider/>
                    <List>
                        <ListItem
                            primaryText="Logout"
                            leftIcon={<ActionInfo/>}
                            onClick={this.logoutUser}
                        />
                    </List>

                </Drawer>



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

export default connect(mapStateToProps)(SideBar);