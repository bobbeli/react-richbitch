import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase'

export const PrivateRoute = ({ component: Component,  ...rest, auth }) => (
    <Route {...rest} render={props => (
        auth.loggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)