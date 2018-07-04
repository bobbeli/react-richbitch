import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase'
import ReactTransitionGroup from 'react-addons-transition-group'

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const PrivateRoute = ({ component: Component,  ...rest, auth }) => (
    <Route {...rest} render={props => (
        firebase.auth().currentUser
            ?
            <Route
                exact
                path="/"
                children={({ match, ...rest }) => (
                    <ReactTransitionGroup component={firstChild}>
                        {match && <Component {...rest}  />}
                    </ReactTransitionGroup>
                )}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)