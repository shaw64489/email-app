const mongoose = require('mongoose');
//require login middleware
const requireLogin = require('../middlewares/requireLogin');
//require credits middleware
const requireCredits = require('../middlewares/requireCredits');
//mailer helper
const Mailer = require('../services/Mailer');
//survey template
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

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
            //split recipients by comma - array of strings
            //map - for every email address return new object that has an email of email
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            //user id
            _user: req.user.id,
            //date sent
            dateSent: Date.now()

        });

        //send an email
        //pass survey that holds email info
        //second arg - what html should be shown inside the email - pass survey object to template
        const mailer = new Mailer(survey, surveyTemplate(survey));

        //send mailer
        mailer.send();

    });

};