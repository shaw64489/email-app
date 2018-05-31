//import the express library
const express = require("express");

//create express application
const app = express();

//create route handler - associate with / route
app.get("/", (req, res) => {

  res.send({
    bye: "buddy"
  });

});


//dynamic port binding for heroku
//enviroment variables at runtime - heroku passes runtime port config
//however if we are running in dev environment - like our machine - run boolean statement (5000)
const PORT = process.env.PORT || 5000;

//listen to incoming traffic on heroku port or local port 5000
app.listen(PORT);
