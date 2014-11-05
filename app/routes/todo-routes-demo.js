/* (1) =============================================================================== */
/* =================================================================================== */
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

module.exports.create = function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err, result){
    res.json(result)
  });
}
/* (2) =============================================================================== */
/* =================================================================================== */
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

module.exports.create = function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err, result){
    res.json(result) 
  });
}

module.exports.list = function(req, res){
  Todo.find({}, function(err, results){
    res.json(results);
  });
}
