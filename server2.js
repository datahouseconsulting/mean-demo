/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');

var mongoose = require('mongoose');


//Bootstrap the db connection
var db = mongoose.connect("mongodb://localhost/mean-demo");

// add in all the models to be used in the application
models = require('./app/models/todo');




// Create a new express object that becomes our webserver
var app = express();


// configure express to work how  you want it to
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());

//routes should be at the last
app.use(app.router);

// line that will make any request to the server point to the public directory
// __dirname is a keyword that will return the current directory
app.use(express.static(path.join(__dirname, 'public')));



// add in the routes that node will allow
var articleRoutes = require('./app/routes/todo-routes');
app.get('/articles', articleRoutes.getArticleList);
app.post('/articles', articleRoutes.createArticle); //




//Start the app by listening on port 8000
app.listen(8000);

// display output so that we know the server was started successfully
console.log('Express app started on port 8000');


