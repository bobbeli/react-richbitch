import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './_helpers/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider>
                    <App/>
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>),
    document.getElementById('root'));
registerServiceWorker();
