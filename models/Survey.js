//import mongoose
const mongoose = require('mongoose');

//pull property Schema from mongoose - same as - const Schema = mongoose.Schema;
const { Schema } = mongoose;

//use Schema object to create Schema for the collection
//describe what records look like
const surveySchema = new Schema ({

    title: String,
    body: String,
    subject: String,
    //recipients list - array of strings
    recipients: [String],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
});

//create model class - tell mongoose that collection needs to be created
mongoose.model('surveys', surveySchema);