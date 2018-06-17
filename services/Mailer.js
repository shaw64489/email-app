const sendgrid = require('sendgrid');
//pull helper property
const helper = sendgrid.mail;
//api key
const keys = require('../config/keys');

class Mailer extends helper.Mail {

}

module.exports = Mailer;