import React from 'react'
import {Slider} from 'material-ui'


class PaymentScale extends React.Component {
    constructor(props){
        super(props);
        this.handleSlider = this.handleSlider.bind(this)
    }

    handleSlider = (event, value) => {
        this.props.handleAmount(event,value);
    };


    render() {
        return (
            <div>
                <Slider
                    min={1}
                    max={37}
                    step={1}
                    value={this.props.amount}
                    onChange={this.handleSlider}
                />
            </div>
        );
    }
}

export default PaymentScale