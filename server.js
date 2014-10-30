/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');


// Create a new express object that becomes our webserver
var app = express();

// line that will make any request to the server point to the public directory
app.use(express.static(path.join(__dirname, 'public')));


//Start the app by listening on port 8000
app.listen(8000);

// display output so that we know the server was started successfully
console.log('Express app started on port 8000');


