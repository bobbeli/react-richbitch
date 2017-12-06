import React, {Component} from 'react';
import logo from '../_assets/logo.svg';
import './App.css';
import {connect} from 'react-redux'
import * as users from '../_actions/userAction'

class App extends Component {

    componentWillMount(){
        this.props.dispatch(users.fetchUser());
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                    {this.props.userList}
                </p>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        users: store.user.userList
    };
}

export default connect(mapStateToProps)(App);
