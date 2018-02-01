import React from 'react'
import {FlatButton, IconButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './BuyPoints.css'
import {history} from '../_helpers/history'

class PaymentButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        history.push('/payment')
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

export default PaymentButton;