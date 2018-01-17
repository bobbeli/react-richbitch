import React from 'react'
import './Navigation.css'

class Navigation extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className="footerNavigation">
                {this.props.left}
                {this.props.right}

            </div>

        );
    }
}

export default Navigation;