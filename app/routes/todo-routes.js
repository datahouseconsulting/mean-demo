var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.create = function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err, result){
    res.json(result) 
  });
};

exports.list = function(req, res){
  Todo.find({}, function(err, results){
    res.json(results);
  });
};
