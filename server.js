//======================================================================================
// Dependencies.
//======================================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//======================================================================================
// Setup Mongo event handlers.
//======================================================================================

// Add error handler when unable to establish a mongodb connection.
mongoose.connection.on('error', function (error) {
  console.log('MongoDB connection error: ' + error);
  mongoose.disconnect();
});

// Add a handler for the connected event.
mongoose.connection.on('connected', function() {
  console.log('Connected to MongoDB');
});

// will hold the reference to the mongo db connection.
var db;

//======================================================================================
// If the demo environment variable is set. use the ops works settings
// to establish the database connection.
//======================================================================================
if (process.env.NODE_ENV && process.env.NODE_ENV == 'demo') {
  try {
    // load the opsworks file.
    var opsworksConfig = './opsworks.js';
    var opsworks = require(opsworksConfig);

    // get the mongo server addresses.
    var mongoServers = opsworks.hosts('mongodb');

    // make sure there are mongo servers up and running.
    if (mongoServers.length > 0) {
      // initialize the connection string.
      var connection = 'mongodb://';

      // build the mongo connection uri's
      var connections = [];
      for (var i = 0; i < mongoServers.length; i++) {
        connections.push('demouser:demopassword@' + mongoServers[i] + ':27017');
      }

      // add the connection uri's to the connection string.
      connection += connections.join(',');

      // add the database name to the connection string..
      connection += '/mean-demo';

      // debug print.
      console.log(connection);

      // establish the mongo connection.
      db = mongoose.connect(connection);
    }
  }
  catch (ex) {
    console.log('opsworks.js file missing.');
  }
}
//======================================================================================
// Running locally. Connect to a local Mongo database.
//======================================================================================
else {
  // establish the Mongo connection.
  db = mongoose.connect('mongodb://localhost/mean-demo');
}

//======================================================================================
// Load the mongoose models.
//======================================================================================
require('./app/models/todo');
require('./app/models/user');

//======================================================================================
// Configure the server.
//======================================================================================

// add the json body parser middleware.
app.use(bodyParser.json());

// get the port number.
var port = process.env.PORT || 8000;

//======================================================================================
// Configure passport.
//======================================================================================

var passportConfig = require('./config/passport');
passportConfig.configure(app, db);


//======================================================================================
// Setup the routes.
//======================================================================================
app.get('/hello', function(request, response){
  response.send('Hello World');
});

// map the public folder so express can serve the web pages.
app.use(express.static(__dirname + '/public'));

// create the routes for the todo list.
var todoRoutes = require('./app/routes/todo-routes');
app.post('/api/todo', todoRoutes.create); 
app.get('/api/todo', todoRoutes.list);

// authentication routes.
var authenticationRoutes = require('./app/routes/authentication');
app.post('/api/login', authenticationRoutes.authenticate);
app.post('/api/logout', authenticationRoutes.logout);
app.get('/api/is_logged_in', authenticationRoutes.isLoggedIn);

// if the s3 key and secret are present.
if (process.env.S3_KEY && process.env.S3_SECRET) {
  // file routes.
  var fileRoutes = require('./app/routes/file');
  app.get('/api/files/:filename', fileRoutes.getFile);
  app.post('/api/files', multipartMiddleware, fileRoutes.uploadFile);
}

//======================================================================================
// Start the express server.
//======================================================================================
app.listen(port, function () {
  console.log('Express started on port: ' + port);
});
