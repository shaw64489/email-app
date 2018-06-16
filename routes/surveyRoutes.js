const mongoose = require('mongoose');
//require login middleware
const requireLogin = require('../middlewares/requireLogin');
//require credits middleware
const requireCredits = require('../middlewares/requireCredits');

//access to mongoose model surveys
const Survey = mongoose.model('surveys');

module.exports = app => {

    //post - create survey route
    //make sure user is logged in - middleware
    //make sure user has enough credits - middleware
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

        //store fields from req body
        const { title, subject, body, recipients  } = req.body;

        //take request properties and create new instance of survey
        const survey = new Survey({

            //title: title is same as below
            title,
            subject,
            body,

        });

    });

};