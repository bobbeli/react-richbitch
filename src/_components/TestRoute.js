import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TransitionGroup from 'react-addons-transition-group';


export const TestRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (

            <TransitionGroup  component="ul">
                <Component {...props} />
            </TransitionGroup>
    )} />
)