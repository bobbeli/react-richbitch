import React from 'react'
import {FlatButton, IconButton} from 'material-ui';

class LogoutButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <FlatButton
                    fullWidth={true}
                    onClick={this.props.handleLogOut}
                    className="logoutButton"
                >Logout</FlatButton>
            </div>

        );
    }
}

export default LogoutButton;