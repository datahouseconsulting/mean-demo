var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  text : {
    type: String
  }
});

mongoose.model('Todo', TodoSchema);
