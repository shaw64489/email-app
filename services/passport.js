//import passport
const passport = require("passport");
//import passport strategy - google
//module exports properties - use Strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//import mongoose library
const mongoose = require('mongoose');
//import google oauth keys
const keys = require("../config/keys");

//require in User class
//fetch something out of mongoose
const User = mongoose.model('users');

//call passports serialize user
//define a function and pass it to serialize user
//pass user model (what we just pulled from db) and done arg
passport.serializeUser((user, done) => {

  //done callback - err obj set null
  //id - identifies user in future requests - not profile id - id assigned by mongo
  done(null, user.id);
});

//take id in cookie - turn into user model
//first arg - is token in cookie - id
//sec ard - done
passport.deserializeUser((id, done) => {

    //find user by ID
    User.findById(id).then(user => {
        done(null, user)
      });
});

//take passport library - inform it how to use google strategy
//in function call - create new instance of google passport strategy
//pass keys to google strategy
//callback option passed - callbackURL - where user is routed to
//proxy true - trust proxy to keep https status in prod
//last arg passed - accessToken, refreshToken, profile, done
passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {

        //initiate a search to see if user exists already
        //query returns a promise - handle async code
        //chain then statement - function called with user found
        User.findOne({ googleId: profile.id })
          .then((existingUser) => {

            //if we found an existing user
            if(existingUser) {

              //first arg is error - should be none
              //second arg is user record found
              done(null, existingUser);
              
            //else create a new user bc ID doesnt exist
            } else {

              //use model class to create instance of a user
              //user with google ID
              //get model instance to persist itself to collection (Mongo) – call function on that method
              //we need to make sure user is created before calling done - chain then statement
              new User({ googleId: profile.id })
                .save()
                //called with newly saved user
                .then(user => done(null, user));

            }

          })
      }
    )
  );