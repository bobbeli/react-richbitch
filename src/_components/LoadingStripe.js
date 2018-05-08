import React, { Component } from "react";
import App from '../App/App';
import {StripeProvider} from 'react-stripe-elements';
import {connect} from "react-redux";
import {connectivityActions} from "../_actions/connectivityActions";


class StripeComponent extends Component {
        constructor(props) {
            super(props);
            const {dispatch} = this.props;

            this.props.dispatch(connectivityActions.setConnectivity());
            this.props.dispatch(connectivityActions.loadingStripe());
        }


        render() {
            return(
                <div>
                    {
                        this.props.connectivity.stripeLoaded ?
                            <StripeProvider apiKey='pk_test_U9j5eRAU5kvAb5yDJn8g4lXF'>
                                <App />
                            </StripeProvider>
                            :
                            <App />
                    }
                </div>
            )
        }
    }


function mapStateToProps(state) {
    const { connectivity } = state;
    return {
        connectivity
    }
}

export default connect(mapStateToProps)(StripeComponent);



