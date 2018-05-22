import React from 'react'
import './Navigation.css'
import {FlatButton} from 'material-ui'

class Navigation extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className="footerNavigation">

                {this.props.top}
                {this.props.left}
                {this.props.right}

                <div className="appVersion">
                    Version {process.env.REACT_APP_VERSION_NUMBER} | {process.env.NODE_ENV}
                </div>

            </div>

        );
    }
}

export default Navigation;