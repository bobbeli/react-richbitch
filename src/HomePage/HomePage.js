import React from 'react';
import {connect} from 'react-redux';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <h2>Home</h2>
                username: {this.props.user.username} <br />
                username: {this.props.user.email}
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