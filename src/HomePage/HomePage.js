import React from 'react';
import {connect} from 'react-redux';
import firebase from '../_helpers/fire'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <h2>Home</h2>
                username: {this.props.user.username}
                email: {this.props.user.email}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const user = state.user;
    return {
        user
    }
}

export default connect(mapStateToProps)(HomePage);