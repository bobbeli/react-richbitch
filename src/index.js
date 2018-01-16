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
import WebFont from 'webfontloader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


WebFont.load({
    google: {
        families: ['Questrial']
    }
});

const muiTheme = getMuiTheme({
    fontFamily: 'Questrial',
    palette: {
        primary1Color: '#1B2028',
        primary2Color: '#28323B',
        primary3Color: '#313D50',
        accent1Color: '#CC8F1B',
        accent2Color: '#EFAD00',
        accent3Color: '#E9A916',
        textColor: '#ffffff',
        alternateTextColor: '#C3C3C3',
        canvasColor: '#1B2028',
        borderColor: '#ffffff',
        disabledColor: '#C3C3C3',
        pickerHeaderColor: '#1B2028',
        clockCircleColor: '#1B2028',
        shadowColor: '#1B2028',
    },
})

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <StripeProvider apiKey="pk_test_U9j5eRAU5kvAb5yDJn8g4lXF">
                        <App/>
                    </StripeProvider>
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>),
    document.getElementById('root'));
registerServiceWorker();
