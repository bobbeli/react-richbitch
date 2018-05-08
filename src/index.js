import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './_helpers/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WebFont from 'webfontloader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Theme} from './_assets/PrestigeMuiTheme';
import StripeComponent from "./_components/LoadingStripe";

/**
 * Load WebFont
 */
WebFont.load({
    google: {
        families: ['Montserrat:100,400,600,900,100italic,400italic,700italic,900italic']
    }
});

/**
 * Load Service Worker for CloudMessaging
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
    });
}

/**
 * Load Material UI Theme
 */
const muiTheme = getMuiTheme(Theme);

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <StripeComponent/>
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>),
    document.getElementById('root'));
registerServiceWorker();
