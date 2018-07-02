const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");

const mongoose = require("mongoose");
//require login middleware
const requireLogin = require("../middlewares/requireLogin");
//require credits middleware
const requireCredits = require("../middlewares/requireCredits");
//mailer helper
const Mailer = require("../services/Mailer");
//survey template
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

//access to mongoose model surveys
const Survey = mongoose.model("surveys");

module.exports = app => {
  //route for users that click on feedback link
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  //process recipient response
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    const events = _
      .chain(req.body)
      //map over list of events
      //for every element in req.body run function
      //extract path and data we need
      .map(({ email, url }) => {
        //extract path from url
        //pull off survey ID and choice
        const match = p.test(new URL(url).pathname);

        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      //goes thru elements in array and removes those that are undefined
      .compact()
      //grab unique events - by email/surveyId properties
      //remove duplicates
      .uniqBy("email", "surveyId")
      .each(event => {
        //find and update one record in survey that matches
        //id - for every survey look at recipients
        //find with correct email and response property - not yet responded to survey
        Survey.updateOne(
          {
            id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
            //update with this
          },
          {
            //mongo operator - logic issued in query
            //increment vote choice by one
            $inc: { [choice]: 1 },
            //update one of the properties in survey record by recipients subdocument collection
            $set: { "recipients.$.responded": true }
          }
        );
      })
      //pull out underlying array
      .value();

    console.log(events);

    res.send({});
  });

  //post - create survey route
  //make sure user is logged in - middleware
  //make sure user has enough credits - middleware
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    //store fields from req body
    const { title, subject, body, recipients } = req.body;

    //take request properties and create new instance of survey
    const survey = new Survey({
      //title: title is same as below
      title,
      subject,
      body,
      //split recipients by comma - array of strings
      //map - for every email address return new object that has an email of email
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      //user id
      _user: req.user.id,
      //date sent
      dateSent: Date.now()
    });

    //send an email
    //pass survey that holds email info
    //second arg - what html should be shown inside the email - pass survey object to template
    const mailer = new Mailer(survey, surveyTemplate(survey));

    //if anything goes wrong - catch request and send back a response
    try {
      //send mailer - async function - need to wait to finish before saving
      await mailer.send();
      //save survey
      await survey.save();
      //subtract credit from user and update user
      req.user.credits -= 1;
      const user = await req.user.save();

      //send back updated user model
      res.send(user);
    } catch (err) {
      //something wrong with data - send back
      res.status(422).send(err);
    }
  });
};
