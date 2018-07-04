import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase'
import ReactTransitionGroup from 'react-addons-transition-group'
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn'
import store from "../_helpers/store";
import {history} from "../_helpers/history"
import PasswordPage from "../PasswordPage/PasswordPage"
const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};
export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(match, ...rest) => (

        firebase.auth().currentUser
            ?
            <ReactTransitionGroup component={firstChild}>
                {match && <Component {...rest} />}
            </ReactTransitionGroup>
            :
                <Redirect to="notloggedin" />

    )} />
)
