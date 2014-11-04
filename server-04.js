var express = require('express');
var app = express();

app.get('/hello', function(request, response){
  response.send('Hello World');
});

app.use(express.static(__dirname + '/public'));

app.listen(8000);

