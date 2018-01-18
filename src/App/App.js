import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from "../_components/PrivateRoute"
import './App.css';
import {connect} from 'react-redux'
import {history} from "../_helpers/history"
import {alertActions} from "../_actions/alertActions";
import NotificationHandler from '../_components/Notification/NotificationHandler'
import asyncComponent from '../_helpers/asyncComponent'
import LoadingHandler from '../_components/LoadingHandler'

const AsyncHome = asyncComponent(() => import('../HomePage/HomePage'));
const AsyncProfilePage = asyncComponent(() => import('../ProfilePage/ProfilePage'));
const AsyncRegisterPage = asyncComponent(() => import('../RegisterPage/RegisterPage'));
const AsyncLoginPage = asyncComponent(() => import('../LoginPage/LoginPage'));
const AsyncPaymentPage = asyncComponent(() => import('../PaymentPage/PaymentPage'));

class App extends Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;

        this.props.dispatch({type: 'LOADER_START'});

    }

    render() {
        const { alert, user, auth, userList, payment, unregister, loader } = this.props;

        //ToDo add Routes to Home and Register Page
        return (
            <div className="App">
                {
                    user.fetching || userList.fetching || auth.fetching || unregister.fetching || payment.fetching || loader.loading ?
                        <LoadingHandler show={true} />
                        :
                        null
                }

                <div className="App-container">
                <Router history={history}>
                {auth.loggedIn ?
                    <div>
                        <Route path="/" exact component={AsyncHome} />
                        <Route path="/user" exact component={AsyncProfilePage} />
                        <Route path="/payment" exact component={AsyncPaymentPage} />
                    </div>
                    :
                    <div>
                        <Route path="/login" component={AsyncLoginPage} />
                        <Route path="/register" component={AsyncRegisterPage} />
                    </div>
                }
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
    const { alert, user, auth, userList, payment, unregister, loader} = state;
    return {
        alert,
        user,
        auth,
        userList,
        payment,
        unregister,
        loader
    }
}

export default connect(mapStateToProps)(App);
