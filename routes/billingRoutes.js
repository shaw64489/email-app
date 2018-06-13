const keys = require('../config/keys');
//pass in key
const stripe = require('stripe')(keys.stripeSecretKey);
//require in login middleware
const requireLogin = require('../middlewares/requireLogin');

//we will call this exported function with express app object
module.exports = (app) => {

    //post request stripe
    //wire up requireLogin middleware
    app.post('/api/stripe', requireLogin, async (req, res) => {
        
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
    
        //after successful charge - take user model and add credits
        req.user.credits += 5;
        //save user - async request
        const user = await req.user.save();
        //send user model back to client updated
        res.send(user);
    });
};