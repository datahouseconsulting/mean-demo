'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
//  articleService = require('../services/article-service'),
  Todo = mongoose.model('Todo');
//  _ = require('lodash');




/**
 * Create a article
 */
exports.createTodo = function(req, res) {

  var articleData = req.body;


  var article = new Article(articleData);
//    article.user = articleData.user;

  article.save(function(err) {

    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        article: article
      });
    } else {
      res.jsonp(article);
    }

  }
};
