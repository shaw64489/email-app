//import the express library
const express = require("express");
//import passport file - since passport doesnt return anything it just needs to run
//we can just use require statement
require("./services/passport");

//create express application
const app = express();

//call authRoutes with app object
//require - retruns a function which we immediately call with the app object
require('./routes/authRoutes')(app);

//dynamic port binding for heroku
//enviroment variables at runtime - heroku passes runtime port config
//however if we are running in dev environment - like our machine - run boolean statement (5000)
const PORT = process.env.PORT || 5000;

//listen to incoming traffic on heroku port or local port 5000
app.listen(PORT);
