import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux'
import {history} from "../_helpers/history"
import NotificationHandler from '../_components/Notification/NotificationHandler'
import asyncComponent from '../_helpers/asyncComponent'
import LoadingElement from '../_components/LoadingElement'
import ReactTransitionGroup from 'react-addons-transition-group'
import Home from '../HomePage/HomePage'
import ProfilePage from '../ProfilePage/ProfilePage';
import PaymentPage from '../PaymentPage/PaymentPage'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import ListPage from '../ListPage/ListPage'
import firebase from 'firebase';

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

class App extends React.Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;

        this.props.dispatch({type: 'LOADER_START'});
        this.requireAuth = this.requireAuth.bind(this);

    }

    requireAuth(){
        if(!firebase.auth().currentUser){
            history.push('/login');
        }
    }

    render() {
        const { alert, user, auth, userList, payment, unregister, loader, push } = this.props;
        return (
            <div className="App">
                {
                    user.fetching || userList.fetching || auth.fetching || unregister.fetching || payment.fetching || loader.loading ||  push.fetching ?
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
                                children={({ match, ...rest }) => (
                                    <ReactTransitionGroup component={firstChild}>
                                        {match && <Home {...rest} />}
                                    </ReactTransitionGroup>
                                )}/>
                            <Route
                                path="/list"
                                onEnter={this.requireAuth()}
                                children={({ match, ...rest }) => (
                                    <ReactTransitionGroup component={firstChild}>
                                        {match && <ListPage {...rest} />}
                                    </ReactTransitionGroup>
                                )}/>
                            <Route
                                path="/user"
                                onEnter={this.requireAuth()}
                                children={({ match, ...rest }) => (
                                    <ReactTransitionGroup component={firstChild}>
                                        {match && <ProfilePage {...rest} />}
                                    </ReactTransitionGroup>
                                )}/>
                            <Route
                                path="/payment"
                                onEnter={this.requireAuth()}
                                children={({ match, ...rest }) => (
                                    <ReactTransitionGroup component={firstChild}>
                                        {match && <PaymentPage {...rest} />}
                                    </ReactTransitionGroup>
                                )}/>
                            <Route
                                path="/register"
                                children={({ match, ...rest }) => (
                                    <ReactTransitionGroup component={firstChild}>
                                        {match && <RegisterPage {...rest} />}
                                    </ReactTransitionGroup>
                                )}/>
                            <Route
                                path="/login"
                                children={({ match, ...rest }) => (
                                    <ReactTransitionGroup component={firstChild}>
                                        {match && <LoginPage {...rest} />}
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
        push
    }
}

export default connect(mapStateToProps)(App);
