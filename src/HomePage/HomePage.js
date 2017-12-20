import React from 'react';
import {connect} from 'react-redux';
import Header from '../_components/Header/Header'
import RichBitchContainer from "./Content/RichBitchContainer";
import PaymentButton from "./PaymentButton";
import {paymentActions} from "../_actions/paymentAction";


class HomePage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
              return (
            <div>
                <Header title="Home" />
                <RichBitchContainer/>
                <PaymentButton/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const user = state.user;
    return {
        user
    }
}

export default connect(mapStateToProps)(HomePage);