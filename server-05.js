var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/hello', function(request, response){
  response.send('Hello World');
});

app.use(express.static(__dirname + '/public'));

var todoRoutes = require('./app/routes/todo-routes');
app.post('/api/todo', todoRoutes.create); 

app.listen(8000);

