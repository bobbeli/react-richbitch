import React from 'react'
import IconButton from 'material-ui/IconButton';
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

                <IconButton
                    className='floatingButtonRight'
                    onClick={this.clickHandler}
                    >
                    <ContentAdd />
                </IconButton>
            </div>

        );
    }
}

export default PaymentButton;