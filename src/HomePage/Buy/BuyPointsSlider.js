import React from 'react'
import {Slider} from 'material-ui'

const min = 0;
const max = Math.pow(10, 6);
const power = 12;

function transform(value) {
    return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
}

function reverse(value) {
    return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
}

class SliderExampleCustomScale extends React.Component {
    state = {
        slider: Math.pow(10, 4),
    };

    handleSlider = (event, value) => {
        this.setState({slider: transform(value)});
    };

    render() {
        return (
            <div>
                <Slider
                    min={min}
                    max={max}
                    step={max / 100}
                    value={reverse(this.state.slider)}
                    onChange={this.handleSlider}
                />
                    <span>{this.state.slider} $</span>
            </div>
        );
    }
}

export default SliderExampleCustomScale