'use strict';

// dependencies.
var mongoose = require('mongoose');
var Application = mongoose.model('Application');

/**
 * Creates a new application in mongo.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.createApplication = function (req, res, next) {
  // make sure the request body is populated.
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error('Missing request body'));
  }

  // create a new application object using the post body.
  var application = new Application(req.body);

  // save the application.
  application.save(function (err, app) {
    // check if an error occurred.
    if (err) {
      return next(err);
    }

    // return a successful response.
    return res.json(app);
  });
};

/**
 * Gets the list of all applications in the mongo database.
 * @param req
 * @param res
 * @param next
 */
exports.list = function (req, res, next) {
  // query for all applications in mongo.
  Application.find({}, function (err, apps) {
    // check if an error occurred.
    if (err) {
      return next(err);
    }

    return res.json(apps);
  });
};

/**
 * Gets an application by its id.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getApplication = function (req, res, next) {
  // make sure the id is provided.
  if (!req.params.id || req.params.id.length == 0) {
    return next(new Error('Missing application id in request parameters.'));
  }

  // query for the app.
  Application.findById(req.params.id, function (err, app) {
    // check if an error occurred.
    if (err) {
      return next(err)
    }

    // return the app.
    return res.json(app);
  });
};