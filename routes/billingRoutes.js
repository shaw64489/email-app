const keys = require('../config/keys');
//pass in key
const stripe = require('stripe')(keys.stripeSecretKey);

//we will call this exported function with express app object
module.exports = (app) => {

    //post request stripe
    app.post('/api/stripe', async (req, res) => {
        
        //create and bill charge
        //amount to bill
        //currency - USD
        //description for charge
        //token id source
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        console.log(charge);
    });
};