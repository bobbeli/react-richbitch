import React from 'react'
import {Slider} from 'material-ui'
import {connect} from 'react-redux'
import {paymentActions} from "../_actions/paymentAction";


class PaymentScale extends React.Component {
    constructor(props){
        super(props);
        this.handleSlider = this.handleSlider.bind(this)
    }

    handleSlider = (event, value) => {
        this.props.dispatch(paymentActions.updateAmount(value));
    };


    render() {
        return (
            <div>
                <Slider
                    min={1}
                    max={37}
                    step={1}
                    value={this.props.payment.amount}
                    onChange={this.handleSlider}
                />
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

export default connect(mapStateToProps)(PaymentScale);