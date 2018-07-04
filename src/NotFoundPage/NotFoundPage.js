import React from 'react';
import {connect} from 'react-redux';
import AnimatedWrapper from '../_helpers/AnimatedWrapper'


class NotFoundPage extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {

        return(
            <div>
                <h1>Hello from 404</h1>


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
export default AnimatedWrapper(connect(mapStateToProps)(NotFoundPage));
