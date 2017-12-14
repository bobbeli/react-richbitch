import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from "../_components/PrivateRoute"
import './App.css';
import {connect} from 'react-redux'
import {userActions} from '../_actions/userAction'
import {history} from "../_helpers/history"
import {alertActions} from "../_actions/alertActions";
import LoginPage from '../LoginPage/LoginPage'
import NotificationHandler from '../_components/NotificationHandler'
import HomePage from '../HomePage/HomePage'
import RegisterPage from '../RegisterPage/RegisterPage'
import {TestRoute} from '../_components/TestRoute'
import TestPage from '../TestPage/TestPage'
import firebase from 'firebase'
import {userConstants} from "../_constants/userConstants";
import LoadingCircle from "../_components/LoadingHandler";

class App extends Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;



        history.listen((location, action) => {
            //dispatch(alertActions.clear());
        })


    }



    render() {
        const { alert, user, auth } = this.props;

        //ToDo add Routes to Home and Register Page
        return (
            <div className="App">
                <Router history={history}>

                {auth.loggedIn ?
                    <div>
                        <PrivateRoute exact path="/" auth={auth} component={HomePage} />
                    </div>
                    :
                    <div>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    </div>

                }
                </Router>


                {alert.message &&
                    <NotificationHandler alert={alert} />
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, user, auth } = state;
    return {
        alert,
        user,
        auth
    }
}

export default connect(mapStateToProps)(App);
