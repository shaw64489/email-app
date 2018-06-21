const sendGrid = require('sendgrid');
//pull helper property
const helper = sendGrid.mail;
//api key
const keys = require('../config/keys');

class Mailer extends helper.Mail {

    //constructor function
    //first arg - object that contains subject and recipients
    //second arg html string from survey template
    constructor({ subject, recipients }, content) {
        //extend mail class
        super();

        //use sendgrid object and pass api key - returns object to communicate to api
        this.sgApi = sendGrid(keys.sendGridKey);

        //who the email is sent from
        this.from_email = new helper.Email('no-reply@emaily.com');
        //subject line
        this.subject = subject;
        //body of email
        this.body = new helper.Content('text/html', content);
        //list of recipients - use helper function
        this.recipients = this.formatAddresses(recipients);

        //make sure body gets added to content of mailer
        this.addContent(this.body);

        //enable click tracking inside the email
        this.addClickTracking();

        //add recipient setup
        this.addRecipients();
    }

    //helper function - recieves list of recipients
    //for every recipient extract email and return
    formatAddresses(recipients) {
        //object with email property - pull out email
        return recipients.map(({ email }) => {

            //do some formatting on the email
            return new helper.Email(email);

        });
    }

    addClickTracking() {
        //two helper variables
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings)
    }

    //adding recipients 
    addRecipients() {

        const personalize = new helper.Personalization()
        //iterate over list of recipients - for each recipient take and add to personalize object
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient)
        });
        //defined by Mail base class - add personalize object
        this.addPersonalization(personalize);
    }

    //function to send mailer to sendgrid api
    async send() {

        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        //send off request
        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;