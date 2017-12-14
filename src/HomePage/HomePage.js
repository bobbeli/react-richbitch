import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Drawer, MenuItem} from 'material-ui';
import SideBar from '../_components/Header'


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSidebar: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);

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
                <AppBar
                title="Home"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonClick={this.toggleDrawer}
                />

                <Drawer
                    docked={false}
                    open={this.state.openSidebar}
                    onRequestChange={this.closeDrawer}
                >
                    <SideBar />
                </Drawer>
                username: {this.props.user.username} <br />
                username: {this.props.user.email}
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

export default connect(mapStateToProps)(HomePage);