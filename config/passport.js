'use strict';

// Dependencies.
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var mongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');
var User = mongoose.model('User');

/***
 * Configures passport authentication.
 *
 * @param app - Reference to the express server instance.
 * @param db - Reference to the mongo db connection.
 */
exports.configure = function (app, db) {
  // setup the cookie parser middleware route.
  app.use(cookieParser());

  // enable express session and configure the cookie and cookie store options.
  app.use(expressSession({
    secret: 'secretttttshhhhhhhh',
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: false
    },
    store: new mongoStore({
      db: db.connection.db,
      collection: 'sessions'
    })
  }));

  // initialize passport and passport session.
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize sessions to the database.
  passport.serializeUser(function(user, callback) {
    callback(null, user._id);
  });

  // retrieve a user based on the session id.
  passport.deserializeUser(function(id, callback) {
    // get the user by its id.
    User.findById(id, function (err, user) {
      return callback(err, user);
    });
  });

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, callback) {
      // attempt to retrieve the user.
      User.findOne({ username: username } , function(err, user) {
        // check if an error occurred.
        if (err) {
          return callback(err);
        }

        // check if a user wasn't returned.
        if (!user) {
          return callback(new Error('User does not exist.'));
        }

        // validate the users password.
        if (!user.authenticate(password)) {
          // invalid password. return an error.
          return callback(new Error('Invalid username or password.'));
        }

        // password was valid. return the user object without the password field.
        delete user.password;
        return callback(null, user);
      });
    }
  ));
};