import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {userActions} from '../_actions/userAction';
import LoadingCircle from '../_components/LoadingHandler'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <h2>ProfilePage</h2>
            </div>
        );
    }
}

export default ProfilePage;