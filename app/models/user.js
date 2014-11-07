'use strict';

// dependencies
var mongoose = require('mongoose');
var crypto = require('crypto');

// schema Definition.
var UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  hashedPassword: String,
  salt: String
});

/**
 * Authenticate - check if the passwords are the same
 *
 * @param {String} plainText
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.authenticate = function(plainText) {
  return this.encryptPassword(plainText) === this.hashedPassword;
};

/**
 * Generates a password salt.
 *
 * @return {String}
 * @api public
 */
UserSchema.methods.makeSalt = function () {
  return crypto.randomBytes(128).toString('base64');
};

/**
 * Encrypts the password.
 *
 * @param {String} password
 * @return {String}
 * @api public
 */
UserSchema.methods.encryptPassword = function (password) {
  if (!password || !this.salt){return '';}
  var hmac = crypto.createHmac('sha1', this.salt);
  return hmac.update(password).digest('hex');
};

/**
 * Virtual method to set and get the password field.
 */
UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
}).get(function() {
  return this._password;
});

/**
 * Removes the secure information from the user object.
 */
UserSchema.methods.removeSecureInformation = function () {
  delete this._doc['hashedPassword'];
  delete this._doc['salt'];
};

// register the user model.
var User = mongoose.model('User', UserSchema);


// preload a user if one doesn't exist.
User.find({}, function (err, users) {
  if (err) {
    return;
  }

  // if no users exist, create one.
  if (!users || users.length == 0) {
    User.create({
      name:'Michael Uranaka',
      username:'michael',
      password: 'password'
    }, function () {
      console.log('User created.');
    });
  }
});