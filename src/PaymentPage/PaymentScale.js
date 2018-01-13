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
        const fibbo = {
            1: 1,
            2: 1,
            3: 2,
            4: 3,
            5: 5,
            6: 8,
            7: 13,
            8: 21,
            9: 34,
            10: 55,
            11: 89,
            12: 144,
            13: 233,
            14: 377,
            15: 610,
            16: 987,
            17: 1597,
            18: 2584,
            19: 4181,
            20: 6765,
            21: 10946,
            22: 17711,
            23: 28657,
            24: 46368,
            25: 75025,
            26: 121393,
            27: 196418,
            28: 317811,
            29: 514229,
            30: 832040,
            31: 1346269,
            32: 2178309,
            33: 3524578,
            34: 5702887,
            35: 9227465,
            36: 14930352,
            37: 24157817,
        }

        this.props.dispatch(paymentActions.updateAmount(fibbo[value] + '.00'));
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