/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// connect to the mongodb database
// if no database by this name (mean-demo) exists, it will create one on the first insert
var db = mongoose.connect("mongodb://localhost/mean-demo");

// add in all the models to be used in the application
require('./app/models/todo');

// Create a new express object that becomes our webserver
var app = express();

// this lets express parse the body of requests and gives them to you as json
app.use(bodyParser.json());

// line that will make any request to the server point to the public directory
// __dirname is a keyword that will return the current directory
app.use(express.static(path.join(__dirname, 'public')));


// add in the routes that node will allow
var todoRoutes = require('./app/routes/todo-routes');
app.get('/todos', todoRoutes.getTodoList);
app.post('/todos', todoRoutes.createTodo); //


//Start the app by listening on port 8000
app.listen(8000);

// display output so that we know the server was started successfully
console.log('Express app started on port 8000');
