import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group'
import LoadingElement from './LoadingElement'

class LoadingCircle extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        return (
            <ReactTransitionGroup className="animated-loader">
                { this.props.show ? <LoadingElement /> : null }
            </ReactTransitionGroup>
        );
    }
}


export default LoadingCircle;
