import React from 'react';
import {connect} from 'react-redux';
import Header from '../_components/Header/Header'
import RichBitchContainer from "./Content/RichBitchContainer";
import BuyPoints from "./Buy/BuyPoints";
import {paymentActions} from "../_actions/paymentAction";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(paymentActions.init())

    }

    render() {
              return (
            <div>
                <Header title="Home" />
                <RichBitchContainer/>
                <BuyPoints/>

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