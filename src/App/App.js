import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from "../_components/PrivateRoute"
import './App.css';
import {connect} from 'react-redux'
import {userActions} from '../_actions/userAction'
import {history} from "../_helpers/history"
import {alertActions} from "../_actions/alertActions";
import LoginPage from '../LoginPage/LoginPage'

class App extends Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;

        history.listen((location, action) => {
            dispatch(alertActions.clear());
        })

        dispatch(userActions.fetchUser());
    }

    render() {
        const { alert } = this.props;

        //ToDo add Routes to Home and Register Page
        return (
            <div className="App">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }

                <Router history={history}>
                    <div>
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    }
}

export default connect(mapStateToProps)(App);
