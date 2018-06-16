//import the express library
const express = require("express");
//import mongoose
const mongoose = require('mongoose');
//import cookie session
const cookieSession = require('cookie-session');
//import passport
const passport = require('passport');
//import body parser
const bodyParser = require('body-parser');
//mongo keys
const keys = require('./config/keys');
//import user schema - create collection of users when app starts
require("./models/User");
//import surveys schema - create collection of surveys when app starts
require("./models/Survey");
//import passport file - since passport doesnt return anything it just needs to run
//we can just use require statement
require("./services/passport");


//instruct mongoose to connect to mongodb
//pass address of mongo instance - mongoURI
mongoose.connect(keys.mongoURI);

//create express application
const app = express();

//body parser middleware
app.use(bodyParser.json());

//tell express to make use of cookies inside app
//pass to function cookiesession
//provide config object to cookie session
app.use(
    cookieSession({
        //how long to exist in browser - 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //key used to encrypt cookie
        keys: [keys.cookieKey]
    })
);

//tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//call authRoutes with app object
//require - retruns a function which we immediately call with the app object
require('./routes/authRoutes')(app);
//call billing routes with app object
//require - retruns a function which we immediately call with the app object
require('./routes/billingRoutes')(app);
//call survey routes with app object
//require - retruns a function which we immediately call with the app object
require('./routes/surveyRoutes')(app);

//run inside of production
if (process.env.NODE_ENV === 'production') {

    //express will serve up production assets
    //like main.js or main.css files
    //if route handler is not set up - look here to see if it matches up
    app.use(express.static('client/build'));

    //express will serve up index html file if it doesnt recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//dynamic port binding for heroku
//enviroment variables at runtime - heroku passes runtime port config
//however if we are running in dev environment - like our machine - run boolean statement (5000)
const PORT = process.env.PORT || 5000;

//listen to incoming traffic on heroku port or local port 5000
app.listen(PORT);
