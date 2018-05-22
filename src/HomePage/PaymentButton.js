import React from 'react'
import {FlatButton, IconButton} from 'material-ui';
import './BuyPoints.css'
import {history} from '../_helpers/history'
import {connect} from "react-redux";
import {alertActions} from "../_actions/alertActions";

class PaymentButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        if(!this.props.connectivity.isOnline){
            this.props.dispatch(alertActions.error('Offline: Its not possible to get Prestige', 5000))
        }else{
            history.push('/payment')
        }
    }

    render(){
        return (
            <div>

                <FlatButton
                    fullWidth={true}
                    onClick={this.clickHandler}
                    className="prestigeButton"
                >Get Prestige</FlatButton>
            </div>

        );
    }
}


function mapStateToProps(state) {
    const {connectivity} = state;
    return {
        connectivity
    }
}

export default connect(mapStateToProps)(PaymentButton);