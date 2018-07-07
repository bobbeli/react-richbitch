import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import AnimatedWrapper from '../_helpers/AnimatedWrapper'


class NotLoggedIn extends React.Component {

    componentWillMount(){
        this.props.dispatch({type: 'LOADER_STOP'})
    }

    render() {


        return(
            <div>
                <h1>You're not logged in</h1>
                <br />
                <Link to="/login">Loggin</Link>


            </div>
        );
    }
}


function mapStateToProps(state) {
    const {registration, user} = state;
    return {
        registration, user
    }
}
export default connect(mapStateToProps)(NotLoggedIn);
