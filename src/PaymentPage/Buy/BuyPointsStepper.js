import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BitchPointsScale from './BitchPointsScale'
import PaymentMethod from '../Checkout/PaymentMethod'

class BuyPointsStepper extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            finished: false,
            stepIndex: 0,
            amount: 10,
        };

    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    //ToDo Resolve Amount Problem for Payment
    handleAmount = (event, value) => {
        this.setState({
            amount: value,
        });
    };

    renderStepActions(step, label) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={label}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {finished, stepIndex} = this.state;

        return (
            <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Bitch Points</StepLabel>
                        <StepContent>
                            <BitchPointsScale handleAmount={this.handleAmount} />
                            {this.renderStepActions(0, 'Next')}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Payment Methods</StepLabel>
                        <StepContent>
                            <PaymentMethod amount={this.state.amount} />
                            {this.renderStepActions(1, 'Pay')}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Overview</StepLabel>
                        <StepContent>
                            {this.renderStepActions(2, 'Done')}
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{margin: '20px 0', textAlign: 'center'}}>
                        <a
                            href=""
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                )}
            </div>
        );
    }
}

export default BuyPointsStepper;