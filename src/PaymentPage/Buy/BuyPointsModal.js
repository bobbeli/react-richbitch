import React from 'react'
import {connect} from 'react-redux'
import {Dialog, TextField, FlatButton} from 'material-ui'
import BuyPointsStepper from "./BuyPointsStepper";

class BuyPointsModal extends React.Component {
    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleClose(){
        this.props.modalHandler()

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
                    title="Get Rich, Bitch"
                    modal={false}
                    open={this.props.modalOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >


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
