// CardSection.js
import React from 'react';
import {CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement} from 'react-stripe-elements';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

class CardSection extends React.Component {

    render() {
        // ToDo resolve Lazy Loading Problem for Components
        return (
            <label>
                <CardNumberElement style={{base: {fontSize: '18px'}}} />

                <CardExpiryElement style={{base: {fontSize: '18px'}}} />

                <CardCVCElement style={{base: {fontSize: '18px'}}} />

                <PostalCodeElement style={{base: {fontSize: '18px'}}} />
            </label>
        );
    }
};

export default CardSection;