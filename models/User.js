//import mongoose
const mongoose = require('mongoose');

//pull property Schema from mongoose - same as - const Schema = mongoose.Schema;
const { Schema } = mongoose;

//use Schema object to create Schema for the collection
//describe what records look like
const userSchema = new Schema ({

    googleId: String,
    //survey credits bought - start with 0
    credits: {
        type: Number,
        default: 0
    }
});

//create model class - tell mongoose that collection needs to be created
mongoose.model('users', userSchema);
