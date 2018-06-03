//import passport
const passport = require("passport");
//import passport strategy - google
//module exports properties - use Strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//import google oauth keys
const keys = require("../config/keys");

//take passport library - inform it how to use google strategy
//in function call - create new instance of google passport strategy
//pass keys to google strategy
//callback option passed - callbackURL - where user is routed to
//last arg passed - accessToken, refreshToken, profile, done
passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('access token:', accessToken);
        console.log('refresh token:', refreshToken);
        console.log('profile:', profile);
      }
    )
  );