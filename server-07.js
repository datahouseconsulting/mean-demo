var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean-demo');

require('./app/models/todo');

app.use(bodyParser.json());

app.get('/hello', function(request, response){
  response.send('Hello World');
});

app.use(express.static(__dirname + '/public'));

var todoRoutes = require('./app/routes/todo-routes');
app.post('/api/todo', todoRoutes.create); 
app.get('/api/todo', todoRoutes.list);

app.listen(8000);

