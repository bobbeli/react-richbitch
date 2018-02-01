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

            </div>

        );
    }
}

export default Navigation;