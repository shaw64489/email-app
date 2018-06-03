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
  app.get("/auth/google/callback", passport.authenticate("google"));
};
