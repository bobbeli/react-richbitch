import React from 'react';
import TextField from 'material-ui/TextField'
import {Styles} from '../../_assets/Styles'
import logo from '../../_assets/logo.svg'


class Logo extends React.Component {
    render() {
        return (
            <div className="App-logo-container">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }
}

export default Logo;