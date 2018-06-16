//import mongoose
const mongoose = require('mongoose');

//pull property Schema from mongoose - same as - const Schema = mongoose.Schema;
const { Schema } = mongoose;

//import recipient schema
const RecipientSchema = require('./Recipient');

//use Schema object to create Schema for the collection
//describe what records look like
const surveySchema = new Schema ({

    title: String,
    body: String,
    subject: String,
    //recipients list - array of RecipientSchema
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    //reference to user - relationship
    //every survey belongs to a user
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});

//create model class - tell mongoose that collection needs to be created
mongoose.model('surveys', surveySchema);