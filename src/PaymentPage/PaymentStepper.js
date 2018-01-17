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
import Navigation from "../_components/Navigation";
import Back from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import './PaymentPage.css'
import {List, ListItem} from 'material-ui/List';



class PaymentStepper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
        };

        this.getStepContent = this.getStepContent.bind(this);
        this.getPriceAndAmount = this.getPriceAndAmount.bind(this);

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

    getPriceAndAmount(){
        return (<div>

            <div className="amountContainer">
                <div className="leftSide"><h3 className="subtitle">Price</h3></div>
                <div className="rightSide"><h3>{this.props.payment.price} $</h3></div>
                <div className="leftSide"><h3 className="subtitle">Prestige</h3></div>
                <div className="rightSide"><h3>{this.props.payment.amount}</h3></div>
            </div>
        </div>);
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div>
                            <PaymentScale /> <br />
                            {this.getPriceAndAmount()}
                        </div>;
            case 1:
                return  <div>
                            {this.getPriceAndAmount()}
                            <h2>Payment</h2>
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
                               <Navigation
                                   left={
                                       <IconButton
                                           className="floatingButtonLeft"
                                           fullWidth={false}
                                           secondary={true}
                                           onClick={this.handlePrev}>
                                           <Back/>
                                       </IconButton>
                                    }
                                    right={<RaisedButton
                                        className='floatingButtonRight'
                                        label={stepperIndex === 2 ? 'Finish' : 'Next'}
                                        primary={true}
                                        onClick={this.handleNext}
                                        />
                                    }
                               />

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