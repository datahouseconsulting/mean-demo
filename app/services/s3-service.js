'use strict';

// dependencies.
var AWS = require('aws-sdk');
var async = require('async');
var path = require('path');

// build the s3 options.
var s3Options =  {
  region: 'us-west-1',
  accessKeyId: 'AKIAI7JSS33ALDWGUHGA',
  secretAccessKey: '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',
  sslEnabled: false,
  maxRetries: 2,
  logger: process.stdout
};

// build the s3 object.
var s3 = new AWS.S3(s3Options);

/**
 * Gets a file from S3.
 * @param folderPath - The file path inside the S3 bucket.
 * @param key - The name of the file.
 * @param callback - The finished callback function.
 */
exports.getFile = function (folderPath, key, callback) {
  // make sure the necessary parameters are present.
  if (folderPath.length == 0 || key.length == 0) {
    return callback(new Error('Missing id or key. Failed to get file.'));
  }

  // get the S3 params to perform the get of the file object.
  // get the folder path.
  var documentFolder = buildFolderPath(path, false);

  // build the query params.
  var params = {
    Bucket: documentFolder,
    Key: key
  };

  // attempt to get the file from S3.
  s3.getObject(params, function(err, data) {
    if (err) {
      return callback(new Error('Failed to retrieve attachment file.'));
    }

    // fire the callback and pass the data object back.
    callback(null, data);
  });
};

/**
 * Uploads a file to the specified path in the S3 bucket.
 * @param folderPath - The file path.
 * @param key - The name of the file.
 * @param contentType - The file content type.
 * @param data - The raw file data.
 * @param callback - The finished callback function.
 */
exports.uploadFile = function (folderPath, key, contentType, data, callback) {
  // make sure the folder is created first.
  this.createDocumentFolder(folderPath, function (err) {
    // check for an error.
    if (err) {
      return callback(err);
    }

    // get the folder path.
    var documentFolder = buildFolderPath(folderPath, false);

    // build the s3 params object.
    var params = {
      Bucket: documentFolder,
      Key: key,
      Body: new Buffer(data),
      ContentType: contentType,
      ContentLength: data.length,
      ACL : 'public-read'
    };


    // upload the file object to s3.
    s3.putObject(params, function (err) {
      // check if an error occurred.
      if (err) {
        return callback(new Error('Failed to upload file to S3.'));
      }

      // fire the finished callback.
      return callback();
    });
  });
};

/**
 * Deletes a file at the specified path.
 * @param folderPath - The file path to the image.
 * @param key - The file name.
 * @param callback - The finished callback function.
 */
exports.deleteFile = function (folderPath, key, callback) {
  // make sure the necessary parameters are present.
  if (folderPath.length == 0 || key.length == 0) {
    return callback(new Error('Missing path or key. Failed to delete file.'));
  }

  // build the params.
  var folder = buildFolderPath(folderPath, false);
  var params = {
    Bucket: folder,
    Key: key
  };

  // attempt to delete the file.
  s3.deleteObject(params, function(err) {
    // check if an error occurred.
    if (err) {
      return callback(new Error('Failed to delete the file.'));
    }

    return callback();
  });
};

/**
 * Deletes a file on S3.
 * @param folderPath - The folder path.
 * @param keys - Array of file keys. (key is full path: bucketname/path/filename)
 * @param callback - The finished callback.
 */
exports.deleteFiles = function (folderPath, keys, callback) {
  // make sure the necessary parameters are present.
  if (path.length == 0 || keys.length == 0) {
    return callback(new Error('Missing id or key. Failed to delete file.'));
  }

  //get the folder path.
  var documentFolder = buildFolderPath(folderPath, false);
  var objectArray = [];
  for (var i = 0; i < keys.length; i++) {
    var obj = { Key: keys[i] };
    objectArray.push(obj);
  }
  var params = {
    Bucket: documentFolder,
    Delete: {
      Objects: objectArray
    }
  };

  // attempt to delete the file.
  s3.deleteObjects(params, function(err) {
    // check if an error occurred.
    if (err) {
      return callback(new Error('Failed to delete files.'));
    }

    return callback();
  });
};

/**
 * Deletes all the files and the folder at the specified path.
 * @param folderPath - The folder path.
 * @param callback - The finished callback function.
 */
exports.deleteFolder = function (folderPath, callback) {
  // need to keep a reference to the instance to use in the callback functions.
  var self = this;

  // make sure the id is set.
  if (folderPath.length == 0) {
    return callback(new Error('Folder path missing. Delete folder failed.'));
  }

  async.waterfall(
    [
      //============================================================================
      // Get the keys for all the files in the specified folder.
      //============================================================================
      function (cb) {
        // get the file listing for the specified document.
        s3.listObjects({ Bucket: 'dh-mean-demo', Marker: folderPath }, function (err, data) {
          // check if an error occurred.
          if (err) {
            return cb(new Error('Failed to delete the folder.'));
          }

          // get all the keys of the files to delete.
          var keys = [];

          for (var i = 0; i < data.Contents.length; i++) {
            keys.push(data.Contents[i].Key);
          }

          return cb(null, keys);
        });
      },

      //============================================================================
      // If there were keys found, delete the files first.
      //============================================================================
      function (keys, cb) {
        if (keys.length === 0) {
          return cb();
        }

        // delete all the files.
        self.deleteFiles(folderPath, keys, function (err) {
          return cb(err);
        });
      },

      //============================================================================
      // Delete the folder.
      //============================================================================
      function (cb) {
        // delete the main folder.
        var params = {
          Bucket: 'dh-mean-demo',
          Key: folderPath
        };

        s3.deleteObject(params, function (err) {
          if (err) {
            return cb(new Error('Failed to delete the main folder with name: ' + folderPath));
          }

          return cb();
        });
      }
    ],

    function (err) {
      return callback(err);
    }
  );
};

/**
 * Checks if a file exists.
 * @param folderPath - The file path to the image.
 * @param key
 * @param callback
 */
exports.fileExists = function (folderPath, key, callback) {
  // make sure the id and key are not empty.
  if (folderPath.length == 0 || key.length == 0) {
    return callback(false);
  }

  // get the folder name.
  var documentFolder = buildFolderPath(folderPath, false);

  // build the params object.
  var params = {
    Bucket: documentFolder,
    Key: key
  };

  // get the metadata for the file if it exists.
  s3.headObject(params, function(err, data) {
    // an error occurred or the object doesn't exist.
    if (err || !data) {
      return callback(false);
    }

    // object exists.
    return callback(true);
  });
};

/**
 * Checks if a folder exists.
 * @param folderPath - The folder path.
 * @param callback - The finished callback function.
 */
exports.folderExists = function (folderPath, callback) {
  // initialize the result to false.
  var result = false;

  // make sure the id is not empty.
  if (folderPath.length == 0) {
    return callback(result);
  }

  // get the bucket path.
  var documentFolder = buildFolderPath(folderPath);

  // attempt to retrieve the bucket form s3.
  s3.headBucket({Bucket:documentFolder}, function (err) {
    // no error means the bucket exists.
    if (!err) {
      result = true;
    }

    return callback(result);
  });
};

/**
 * Safely creates a folder using the specified path as the name in the S3 bucket.
 * @param folderPath - The folder path.
 * @param callback - The finished callback function.
 */
exports.createDocumentFolder = function (folderPath, callback) {
  // make sure the id is set.
  if (folderPath.length == 0) {
    return callback(new Error('Missing folder path.'));
  }

  // check if the folder exists first.
  this.folderExists(folderPath, function (exists) {
    if (exists) {
      return callback();
    }

    // get the folder path.
    var documentFolder = buildFolderPath(folderPath, true);

    // build the s3 params.
    var params = {
      Bucket: documentFolder,
      ACL   : 'public-read-write'
    };

    // attempt to create the folder.
    s3.createBucket(params, function(err) {
      // check if an error occurred.
      if (err) {
        return callback(new Error('Failed to create the folder on S3.'));
      }

      return callback();
    });
  });
};

/**
 * Builds the folder path for S3.
 * @param folderPath - The path not including the bucket.
 * @param includeSlash - If we should include the last slash or not.
 */
function buildFolderPath (folderPath, includeSlash) {
  // build the folder name from the document id.
  var bucketName = 'dh-mean-demo';
  var fullPath = path.join(bucketName, folderPath);
  if (includeSlash) {
    fullPath += '/';
  }

  return fullPath;
}
