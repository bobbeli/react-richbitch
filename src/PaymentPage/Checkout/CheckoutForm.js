// CheckoutForm.js
import React from 'react';
import {connect} from 'react-redux';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection';
import {alertActions} from '../../_actions/alertActions'
import {paymentActions} from "../../_actions/paymentAction";
import {RaisedButton, FlatButton} from 'material-ui'
import {paymentConstants} from "../../_constants/paymentConstants"

class CheckoutForm extends React.Component {

    handleSubmit = (ev) => {
        ev.preventDefault();
        // Payment Requests Starts
        this.props.dispatch({type: paymentConstants.PAYMENT_REQUEST})

        this.props.stripe.createToken()
            .then((token) => {
                if(token.error){
                    this.props.dispatch(alertActions.error(token.error.message))
                    let error = {error: 'No stripe Token available'}
                    this.props.dispatch({type: paymentConstants.PAYMENT_FAILURE, error});
                } else{
                    this.props.dispatch(paymentActions.charge(token, this.props.amount))
                }
            });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CardSection />
                <FlatButton
                    label="Back"
                    onClick={this.props.handlePrev}
                    style={{marginRight: 12}}
                />
                <RaisedButton
                    label='Pay'
                    primary={true}
                    onClick={this.handleSubmit}
                />
            </form>
        );
    }
}

export default connect()(injectStripe(CheckoutForm))