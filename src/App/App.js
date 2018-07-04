import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import './App.css';
import {connect} from 'react-redux'
import {history} from "../_helpers/history"
import NotificationHandler from '../_components/Notification/NotificationHandler'
import LoadingElement from '../_components/LoadingElement'
import HomePage from '../HomePage/HomePage'
import ProfilePage from '../ProfilePage/ProfilePage';
import PaymentPage from '../PaymentPage/PaymentPage'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import PasswordPage from '../PasswordPage/PasswordPage'
import ListPage from '../ListPage/ListPage'
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn'
import firebase from 'firebase';
import {PrivateRoute} from '../_components/PrivateRoute'
import IntroModal from '../_components/IntroModal/IntroModal'

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

class App extends React.Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;
    }

    componentWillMount(){
        console.log('this', firebase.auth().currentUser)
        if(firebase.auth().currentUser){
            history.push('home');
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

                        <IntroModal />

                        <Router history={history}>
                            <div>
                                <Route
                                    path="/register"
                                    component={RegisterPage}
                                />
                                <Route
                                    path="/notloggedin"
                                    component={NotLoggedIn}
                                />
                                <Route
                                    path="/password"
                                    component={PasswordPage}
                                />
                                <Route
                                    path="/login"
                                    component={LoginPage}
                                />
                                <PrivateRoute
                                    path="/home"
                                    component={HomePage}
                                />
                                <PrivateRoute
                                    path="/list"
                                    component={ListPage}
                                />
                                <PrivateRoute
                                    path="/user"
                                    component={ProfilePage}
                                />
                                <PrivateRoute
                                    path="/payment"
                                    component={PaymentPage}
                                />


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
