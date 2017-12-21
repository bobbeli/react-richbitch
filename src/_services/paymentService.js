import axios from 'axios'
import {paymentConstants} from '../_constants/paymentConstants'

export const paymentService = {
    charge,

};

/**
 * Requests to RichBitch API
 * Charging User for certain amount.
 * @param token Object, generated Stripe Token
 * @param amount Int, will be charged
 * @returns {Promise}
 */
function charge(token, amount) {
    return new Promise((resolve, reject) => {
       axios.post(paymentConstants.API_PATH + '/charge',
           {
               stripeToken: token,
               amount: amount
           })
            .then((res) => {
                resolve(res);

            }).catch((err) => {
                reject(err);
        })
    });


}


