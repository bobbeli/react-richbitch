import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm'


class PaymentMethod extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 1
        };
    }




    render() {
        const types = ['CreditCard', 'test'];

        const paymentMethods = types.map((c, index) =>
            <MenuItem key={index} value={index + 1} primaryText={c} />
        );
        return (
            <div>
                <Elements>
                     <CheckoutForm amount={this.props.amount} />
                </Elements>
            </div>
        );
    }
}


export default PaymentMethod;