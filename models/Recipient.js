//import mongoose
const mongoose = require('mongoose');

//pull property Schema from mongoose - same as - const Schema = mongoose.Schema;
const { Schema } = mongoose;

//use Schema object to create Schema for the collection
//describe what records look like
const recipientSchema = new Schema ({

    email: String,
    responded: {type: Boolean, default: false }

});

//export schema
module.exports = recipientSchema;