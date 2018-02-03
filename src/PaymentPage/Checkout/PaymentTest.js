import React from 'react';
import {Elements} from 'react-stripe-elements';
import {connect} from 'react-redux';
import CheckoutForm from './CheckoutForm'


class PaymentTest extends React.Component {
    render() {
               return (
            <div>
                <Elements>
                     <CheckoutForm amount={this.props.payment.amount} handlePrev={this.props.handlePrev} />
                </Elements>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {payment} = state;
    return {
        payment
    }
}

export default connect(mapStateToProps)(PaymentTest);