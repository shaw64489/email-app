import React, { Component } from 'react';

import StripeCheckout from 'react-stripe-checkout';

import { connect } from 'react-redux';

import * as actions from '../actions';


class Payments extends Component {

    render() {

        //return stripe checkout component
        //option 1 - amount of money we request from user - defaults to US cents
        //option 2 - token back from stripe representing the charge
        //option 3 - stripe key - publishable
        //2 additional props to customize text in modal
        //name - shows as header
        //description - shows on header
        //to style element - use child element - button
        return (
            <StripeCheckout 
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                //when we get token from stripe api we call action creator - with token
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

//wire up connect helper:
export default connect(null, actions)(Payments);