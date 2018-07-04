// CheckoutForm.js
import React from 'react';
import {connect} from 'react-redux';
import {injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import CardSection from './CardSection';
import {alertActions} from '../../_actions/alertActions'
import {paymentActions} from "../../_actions/paymentAction";
import {RaisedButton, FlatButton} from 'material-ui'
import {paymentConstants} from "../../_constants/paymentConstants"
import Navigation from "../../_components/Navigation";
import Back from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import {pointService}from '../../_services/pointService'
import {pointConstants} from "../../_constants/pointConstants"


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

            console.log('Received customer information: ', data);
            if(token.error){
                this.props.dispatch(alertActions.error(token.error.message))
                let error = {error: 'No stripe Token available'}
                this.props.dispatch({type: paymentConstants.PAYMENT_FAILURE, error});
            } else{
                this.props.dispatch(paymentActions.charge(token, this.props.amount, complete))
            }


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

        if(this.props.testMode){
            this.props.dispatch({type: paymentConstants.PAYMENT_REQUEST});

            let token = {
                id: 'SuperTestId',
                amount: this.props.amount,
                price: this.props.price
            }
            this.props.dispatch({type: paymentConstants.PAYMENT_SUCCESS, token});


            this.props.dispatch(alertActions.success('Payment Successful'))

            // Updating Local Points
            pointService.addPoints(this.props.amount)
                .then((res) => {
                    let totalPoints = res;
                    this.props.dispatch({type: pointConstants.TOTAL_POINTS_UPDATE, totalPoints});
                }).catch((error) => {
                this.props.dispatch(alertActions.error(error))
            });

        }else{

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

    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>



                {
                    this.props.testMode ? null : (

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

                        </div>))
                }

                <Navigation
                    left={
                        <IconButton
                            className="floatingButtonLeft"
                            fullWidth={false}
                            secondary={true}
                            onClick={this.props.handlePrev}>
                            <Back/>
                        </IconButton>
                    }
                    right={<RaisedButton
                        label='Pay'
                        className='floatingButtonRight'
                        primary={true}
                        onClick={this.handleSubmit}
                    />}
                />


            </form>
        );
    }
}

export default connect()(injectStripe(CheckoutForm))