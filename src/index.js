import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './_helpers/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {init} from './_helpers/firebaseDB'
import {StripeProvider} from 'react-stripe-elements';


ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider>
                    <StripeProvider apiKey="pk_test_U9j5eRAU5kvAb5yDJn8g4lXF">
                        <App/>
                    </StripeProvider>
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>),
    document.getElementById('root'));
registerServiceWorker();
