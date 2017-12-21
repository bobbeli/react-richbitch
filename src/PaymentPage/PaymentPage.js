import React from 'react';
import {connect} from 'react-redux';
import Header from '../_components/Header/Header'
import PaymentStepper from "./PaymentStepper";
import LoadingHandler from '../_components/LoadingHandler'


class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
              return (
            <div>
                <Header title="Payment" />
                {
                    this.props.payment.fetching ?
                    <LoadingHandler show={true} /> : null
                }
                <PaymentStepper />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, payment} = state;
    return {
        user,
        payment
    }
}

export default connect(mapStateToProps)(PaymentPage);