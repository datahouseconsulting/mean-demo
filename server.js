//======================================================================================
// Dependencies.
//======================================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
      mongoose.connect(connection);
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
  mongoose.connect('mongodb://localhost/mean-demo');
}

//======================================================================================
// Load the mongoose models.
//======================================================================================
require('./app/models/todo');

//======================================================================================
// Configure the server.
//======================================================================================

// add the json body parser middleware.
app.use(bodyParser.json());

// get the port number.
var port = process.env.PORT || 8000;

//======================================================================================
// Setup your routes.
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

//======================================================================================
// Start the express server.
//======================================================================================
app.listen(port, function () {
  console.log('Express started on port: ' + port);
});
