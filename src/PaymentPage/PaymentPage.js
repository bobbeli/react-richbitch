import React from 'react';
import {connect} from 'react-redux';
import Header from '../_components/Header/Header'
import BuyPointsStepper from './Buy/BuyPointsStepper'
import PaymentStepper from "./PaymentStepper";

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 1
        };
        this.handleAmount = this.handleAmount.bind(this);
    }

    handleAmount(event,value){
        console.log('payment Page', event, value);
        this.setState({
            amount: value
        })
    }

    render() {
              return (
            <div>
                <Header title="Payment" />
                <PaymentStepper handleAmount={this.handleAmount} amount={this.state.amount} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const user = state.user;
    return {
        user
    }
}

export default connect(mapStateToProps)(PaymentPage);