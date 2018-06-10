//import passport
const passport = require("passport");

//we will call this exported function with express app object
module.exports = (app) => {
  //add route handler
  //involve passport as second arg
  //GET - /auth/google - authenticate user on this route
  //'google' is used to inform passport to user GoogleStrategy
  //second arg - scope specifies what access we need in user profile - profile and email
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //handle case when user visits /auth/google/callback
  //use passport to take request and resolve into actual profile
  //GoogleStrategy doesnt send to oauth flow this time - it exchanges the code added
  //to the url to get the user profile
  //after passport authenticate - redirect to some other route
  app.get(
    "/auth/google/callback", 
    passport.authenticate("google"),
    (req, res) => {
      //redirect to surveys dashboard
      res.redirect('/surveys');
    }
  );

  //whenever user makes request to this route - we log user out of app
  app.get('/api/logout', (req, res) => {

    //takes cookie and kills it
    req.logout();
    //redirect to root on logout
    res.redirect('/');
  });

  //get api current user route
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};
