import React from 'react'
import {Slider} from 'material-ui'


class BitchPointsScale extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            val: 10,
        };

        this.handleSlider = this.handleSlider.bind(this)
    }

    handleSlider = (event, value) => {
        this.props.handleAmount(event,value);
        this.setState({
            val: value,
        });
    };




    render() {
        return (
            <div>
                <Slider
                    min={1}
                    max={37}
                    step={1}
                    value={this.state.val}
                    onChange={this.handleSlider}
                />
                <span>{this.state.val} $</span>
            </div>
        );
    }
}

export default BitchPointsScale