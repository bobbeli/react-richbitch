import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../_helpers/fire'

export const PrivateRoute = ({ component: Component,  ...rest, user }) => (
    <Route {...rest} render={props => (
        fire.auth().currentUser
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)