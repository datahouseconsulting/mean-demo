'use strict';

// dependencies.
var passport = require('passport');

/**
 * Authenticates the user with passport.
 * @param req
 * @param res
 * @param next
 */
exports.authenticate = function (req, res, next) {
  // authenticate using passport.
  passport.authenticate('local', function(err, user) {
    // check if an error occurred.
    if(err) {
      return next(new Error('Authentication failed.'));
    }

    // check if it was authenticated successfully. if not, return an error.
    if (!user) {
      //invalid credentials, return failed
      return next(new Error('Invalid Credentials'));
    }

    // user was found, so attempt to login
    req.logIn(user, function(err) {
      // check if and error occurred.
      if (err) {
        return next(new Error('Authentication failed.'));
      }

      // don't send back hashed_password and salt to client
      user.removeSecureInformation();

      // send the user back to the response.
      res.json(user);
    });
  })(req, res, next);
};

/**
 * Checks if a user is logged in. If they are, returns the user object. Else returns false.
 * @param req
 * @param res
 */
exports.isLoggedIn = function (req, res) {
  if (req.user) {
    req.user.removeSecureInformation();
    return res.json({loggedIn: true, user: req.user});
  }
  else {
    return res.json({loggedIn: false});
  }
};

/**
 * logs a user out.
 * @param req
 * @param res
 */
exports.logout = function (req, res) {
  req.logout();
  req.session.destroy();

  // send the response.
  res.json({status: 'success'});
};