'use strict';

// dependencies
var mongoose = require('mongoose');

// build the application schema.
var ApplicationSchema = new mongoose.Schema({
  title: String,
  objective: String,
  description: String,
  status: String
});

// register the application schema.
mongoose.model('Application', ApplicationSchema);