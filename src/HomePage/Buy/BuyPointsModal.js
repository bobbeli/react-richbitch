import React from 'react'
import {connect} from 'react-redux'
import {Dialog, TextField, FlatButton} from 'material-ui'
import VerticalLinearStepper from "./BuyPointsStepper";

class BuyPointsModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleClose(){
        console.log('modal close request');
    }

    handleChange(event) {
        const { value } = event.target;
        console.log(value)
        this.setState({
            password:  value
        });
    }


    render(){
        return (
            <div>
                <Dialog
                    title="Get Rich Bitch"
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >

                    <VerticalLinearStepper/>

                </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(BuyPointsModal);
