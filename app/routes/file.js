'use strict';

// dependencies.
var s3Service = require('../services/s3-service');
var fs = require('fs');

/**
 * Checks that a user is logged in.
 * @param req
 * @param res
 * @param next
 * @returns {*|ServerResponse}
 */
exports.isLoggedIn = function (req, res, next) {
  // check if passport added the user reference.
  if (!req.user) {
    return res.json('Not Authorized');
  }

  // proceed to next route.
  next();
};

/**
 * Gets a file from s3.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getFile = function (req, res, next) {
  // make sure a file name is in the request params.
  if (!req.params.filename) {
    return next(new Error('Missing file name in request parameters.'));
  }

  // get the file from s3.
  s3Service.getFile('testfiles', req.params.filename, function (err, data) {
    // check if an error occurred.
    if (err) {
      return next(err);
    }

    // set the headers.
    res.set({
      "Content-Disposition": 'attachment; filename="'+ req.params.filename +'"',
      "Content-Type": data.ContentType
    });

    // send the file to the response.
    res.send(200, data.Body);
  });
};

/**
 * Uploads a file to S3.
 * @param req
 * @param res
 * @param next
 */
exports.uploadFile = function (req, res, next) {
  // read the contents of the file from the temp path.
  fs.readFile(req.files.file.path, function (err, data) {
    // check if an error occurred.
    if (err) {
      return next(err);
    }

    // get the file metadata.
    var contentType = req.files.file.headers['content-type'];
    var fileName = req.files.file.originalFilename;

    // upload the file to S3.
    s3Service.uploadFile('testfiles', fileName, contentType, data, function (err) {
      // check if an error occurred.
      if (err) {
        return next(err);
      }

      // call next to let the next route handle updating the mongo db entry for the specified document id.
      res.json({status: 'success'});
    });
  });
};