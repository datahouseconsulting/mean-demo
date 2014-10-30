/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

/**
 * Create a todo document in monogodb
 */
exports.createTodo = function(req, res) {

  var todo = new Todo(req.body);

  todo.save(function(err) {
    if (err) {
      res.jsonp({error: 'error saving todo'});
    } else {
      res.jsonp(todo);
    }
  });
};


/**
 * List of todos
 */
exports.getTodoList = function(req, res) {
  Todo.find().sort('created').exec(function(err, todoList) {
    if (err) {
      res.jsonp({error: 'error getting todo list'});
    } else {
      res.jsonp(todoList);
    }
  });
};