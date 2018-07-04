import React from 'react';
import { Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import './App.css';
import {connect} from 'react-redux'
import {history} from "../_helpers/history"
import NotificationHandler from '../_components/Notification/NotificationHandler'
import LoadingElement from '../_components/LoadingElement'
import ReactTransitionGroup from 'react-addons-transition-group'
import Home from '../HomePage/HomePage'
import ProfilePage from '../ProfilePage/ProfilePage';
import PaymentPage from '../PaymentPage/PaymentPage'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import PasswordPage from '../PasswordPage/PasswordPage'
import ListPage from '../ListPage/ListPage'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import {PrivateRoute} from '../_components/PrivateRoute'
import firebase from 'firebase';
import {connectivityActions} from "../_actions/connectivityActions";
import {alertActions} from "../_actions/alertActions";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

class App extends React.Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;
        this.requireAuth = this.requireAuth.bind(this);

    }


    requireAuth(){
        if(!firebase.auth().currentUser){
            console.log('called auth', firebase.auth().currentUser)

            history.push('/login')
        }

    }

    render() {
        const { alert, user, auth, userList, payment, unregister, loader, push } = this.props;
        return (
            <div className="App">
                    {
                        user.fetching ||
                        userList.fetching ||
                        auth.fetching ||
                        unregister.fetching ||
                        loader.loading ||
                        payment.fetching ||
                        push.fetching ?
                            <LoadingElement />
                            :
                            null
                    }
                    <div className="App-container">
                    <Router history={history}>
                        <div>
                        <Route
                            exact
                            path="/"
                            onEnter={this.requireAuth()}
                            render={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <Home {...rest} />}
                                </ReactTransitionGroup>
                            )}/>

                        <Route
                            exact
                            path="/list"
                            render={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <ListPage {...rest} />}
                                </ReactTransitionGroup>
                            )}/>
                        <Route
                            path="/user"
                            children={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <ProfilePage {...rest} />}
                                </ReactTransitionGroup>
                            )}/>
                        <Route
                            exact={true}
                            path="/payment"
                            render={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <PaymentPage {...rest} />}
                                </ReactTransitionGroup>
                            )}/>

                        <Route
                            path="/register"
                            render={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <RegisterPage {...rest} />}
                                </ReactTransitionGroup>
                            )}/>
                        <Route
                            path="/password"
                            render={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <PasswordPage {...rest} />}
                                </ReactTransitionGroup>
                            )}/>
                        <Route
                            path="/login"
                            render={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <LoginPage {...rest} />}
                                </ReactTransitionGroup>
                            )}/>
                        <Route
                            path="/*"
                            render={({ match, ...rest }) => (
                                <ReactTransitionGroup component={firstChild}>
                                    {match && <NotFoundPage {...rest} />}
                                </ReactTransitionGroup>
                            )}/>
                    </div>
                    </Router>

                    {alert.message &&
                        <NotificationHandler alert={alert} />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, user, auth, userList, payment, unregister, loader, push} = state;
    return {
        alert,
        user,
        auth,
        userList,
        payment,
        unregister,
        loader,
        push,
    }
}

export default withRouter(connect(mapStateToProps)(App));
