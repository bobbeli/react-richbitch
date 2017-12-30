// CheckoutForm.js
import React from 'react';
import {connect} from 'react-redux';
import {injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import CardSection from './CardSection';
import {alertActions} from '../../_actions/alertActions'
import {paymentActions} from "../../_actions/paymentAction";
import {RaisedButton, FlatButton} from 'material-ui'
import {paymentConstants} from "../../_constants/paymentConstants"

class CheckoutForm extends React.Component {

    constructor(props){
        super(props);

        // For full documentation of the available paymentRequest options, see:
        // https://stripe.com/docs/stripe.js#the-payment-request-object
        const paymentRequest = this.props.stripe.paymentRequest({
            country: 'CH',
            currency: 'chf',
            total: {
                label: 'get Rich, Bitch',
                amount: parseInt(this.props.amount),
            },
        });

        paymentRequest.on('token', ({complete, token, ...data}) => {
            console.log('Received Stripe token: ', token);
            console.log('Received customer information: ', data);
            complete('success');
        });

        paymentRequest.canMakePayment().then(result => {
            this.setState({canMakePayment: !!result});
        });

        this.state = {
            canMakePayment: false,
            paymentRequest,
        };

    }

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
                {
                    this.state.canMakePayment ? (
                        <div>
                        <PaymentRequestButtonElement
                            paymentRequest={this.state.paymentRequest}
                            className="PaymentRequestButton"
                            style={{
                                // For more details on how to style the Payment Request Button, see:
                                // https://stripe.com/docs/elements/payment-request-button#styling-the-element
                                paymentRequestButton: {
                                    theme: 'dark',
                                    height: '64px',
                                },
                            }}
                        />
                        <FlatButton
                            label="Back"
                            onClick={this.props.handlePrev}
                            style={{marginRight: 12}}
                            />
                        </div>
                    ) : (<div>
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
                        </div>)
                }


            </form>
        );
    }
}

export default connect()(injectStripe(CheckoutForm))