// CheckoutForm.js
import React from 'react';
import {connect} from 'react-redux';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection';
import {alertActions} from '../../_actions/alertActions'
import {paymentActions} from "../../_actions/paymentAction";

class CheckoutForm extends React.Component {
    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        this.props.stripe.createToken()
            .then((token) => {

                if(token.error){
                    this.props.dispatch(alertActions.error(token.error.message))
                    console.log('Received Stripe error:', token);

                } else{
                    // Successfull Token, request to Server.
                    console.log('Cargin Credit Card', token)
                    this.props.dispatch(paymentActions.charge(token, this.props.amount))
                }
            });

        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CardSection />
                <button>Test Payment</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}
export default injectStripe(connect()(CheckoutForm));