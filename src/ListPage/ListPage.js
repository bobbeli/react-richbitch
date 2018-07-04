import React from 'react';
import {connect} from 'react-redux';
import PrestigeContainer from './Content/PrestigeContainer'
import AnimatedWrapper from '../_helpers/AnimatedWrapper'

class ListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div >
                <PrestigeContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, userList} = state;
    return {
        user, userList
    }
}

export default AnimatedWrapper(connect(mapStateToProps)(ListPage));