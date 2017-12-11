import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {userActions} from '../_actions/userAction';
import LoadingCircle from '../_components/LoadingHandler'

class TestPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillAppear(callback){
        console.log('willmaount')
        callback();
    }

    componentWillLeave(callback){
        console.log('will Leave')
    }



    render() {

        return (
            <div>
                <h2>TestPage</h2>
                <Link to="/">test</Link>
            </div>
        );
    }
}

export default TestPage;