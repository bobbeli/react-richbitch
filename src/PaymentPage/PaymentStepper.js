import React from 'react';
import {connect} from 'react-redux'
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PaymentScale from "./PaymentScale";
import PaymentMethod from "./Checkout/PaymentMethod";
import {paymentActions} from "../_actions/paymentAction";
import {paymentConstants} from "../_constants/paymentConstants";
import {history} from "../_helpers/history"

class PaymentStepper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
        };

        this.getStepContent = this.getStepContent.bind(this);

    }

    handleNext = () => {
        let {stepperIndex} = this.props.payment;
        if(stepperIndex >= 2){
            this.props.dispatch({type: paymentConstants.STEPPER_FINISHED});
            history.push('/')
        } else {
            this.props.dispatch(paymentActions.updateStepper(stepperIndex + 1));
        }
    };

    handlePrev = () => {
        let {stepperIndex} = this.props.payment;
        if(stepperIndex === 0){
            history.push('/')
        }
        if (stepperIndex > 0) {
            this.props.dispatch(paymentActions.updateStepper(stepperIndex - 1));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div>
                        <PaymentScale /> <br />
                    $ {this.props.payment.amount}
                    </div>;
            case 1:
                return <div>
                    <span>$ {this.props.payment.amount} get Rich Bitch</span>
                    <PaymentMethod handlePrev={this.handlePrev} />
                </div>;
            case 2:
                return 'Phu, congrats you are Rich!';
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {stepperFinished, stepperIndex} = this.props.payment;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepperIndex}>
                    <Step>
                        <StepLabel>Get Points</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Buy</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Done</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    <div>
                        {this.getStepContent(stepperIndex)}
                        {
                           ! this.props.payment.stepperIndex == 1 &&
                               <div style={{marginTop: 12}}>
                                   <FlatButton
                                       label="Back"
                                       onClick={this.handlePrev}
                                       style={{marginRight: 12}}
                                   />
                                   <RaisedButton
                                       label={stepperIndex === 2 ? 'Finish' : 'Next'}
                                       primary={true}
                                       onClick={this.handleNext}
                                   />
                               </div>
                        }

                    </div>
                </div>
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

export default connect(mapStateToProps)(PaymentStepper);