var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

module.exports.create = function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err, result){
    res.json(result) 
  });
}
