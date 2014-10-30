mean-demo
=========

Simple demo using Mongodb, Express, AngularJs, and NodeJs


Steps to get started:

1. Download and install NodeJS

  http://nodejs.org/

  A.  Verify your node.js can be run from anywhere
      Open up a windows command prompt and type:

        node -v

      This should give you the version of node you are running.
      If you get something like this:

        'node' is not recognized as an internal or external command,
        operable program or batch file.
        you will have to add it to your system path

  B.  Add node.js to your system path (if needed - check above)
      Search for where your node is located and remember/copy/save the path there.
      For instance, mines is located in:  C:\Program Files\nodejs

      Go to Control Panel -> System -> Advanced System Settings
      Click on Environment Variables
      edit this variable: PATH
      Add your nodejs location to the end of it:
      ;C:\Program Files\nodejs
      (dont forget the semicolon in the beginning - this separates the different paths you can add)
      (this may require you to restart your computer)


2. Install ExpressJs from NPM
  (Main NPM site: https://www.npmjs.org/)

  From this directory (mean-demo), type from a command prompt:

  npm install express

  You will now have a folder named "node_modules in this directory"
  This will contain all of the node modules that you "install"


3. Create a server.js file in your mean-demo directory
  This will be the code for the node webserver that you will be running

  server.js:
  --------------

  /**
   * Module dependencies.
   */
  var express = require('express');
  var path = require('path');


  // Create a new express object that becomes our webserver
  var app = express();

  // line that will make any request to the server point to the public directory
  app.use(express.static(path.join(__dirname, 'public')));


  //Start the app by listening on port 8000
  app.listen(8000);

  // display output so that we know the server was started successfully
  console.log('Express app started on port 8000');

  -----------


4. Create an index.html file in a public folder
   (This will be the first web page that your server will serve up)

   Put something in it like "Hello World"


5. Run your webserver

   From this directory (mean-demo), type from a command prompt:

   node server.js

   (This will run your server.js code and basically start up your server)

   Go to 127.0.0.1:8000/index.html to see your page


6. Download bootstrap and add it to your app

  http://getbootstrap.com/

  Two choices:
  1. download it and put it into a folder in your app,
  2. reference the cdn directly from your page

  1. pros - you always have it even if the user cant access the bootstrap page, they only get it from one place
  2. pros - its possible for it to be cached and slightly faster to retrieve on the initial load

  For now, we will use the CDNs:

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">

  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

  Special note: A lot of boostrap's js uses Jquery to work.
  Download or reference jquery as well - The Jquery library has to be in front of the bootstrap js reference
  ORDER MATTERS

    <!-- Jquery minified Javascript -->
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>


7. Play around and add bootstrap elements
  Maybe an icon:
  (choose from http://getbootstrap.com/components/)

  <span class="glyphicon glyphicon-search"></span>

  or maybe a button group:

  <!-- Single button -->
  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      Action <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="#">Separated link</a></li>
    </ul>
  </div>

  example of reponsive columns (http://getbootstrap.com/css/):
  (i added the background colors to see it better)

  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-8" style="background-color: lightgray;">.col-xs-12 .col-sm-6 .col-md-8</div>
    <div class="col-xs-6 col-md-4"  style="background-color: yellow;">.col-xs-6 .col-md-4</div>
  </div>
  <div class="row">
    <div class="col-xs-6 col-sm-4" style="background-color: cornflowerblue;">.col-xs-6 .col-sm-4</div>
    <div class="col-xs-6 col-sm-4" style="background-color: cadetblue;">.col-xs-6 .col-sm-4</div>
    <div class="col-xs-6 col-sm-4" style="background-color: lightblue;">.col-xs-6 .col-sm-4</div>
  </div>


8. Download and include AngularJS

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"></script>

  make sure you have html/head/body tags
  add ng-app to the html tag

  here is a simple example of databinding

  https://angularjs.org/


 <!doctype html>
 <html ng-app>
   <head>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"></script>
   </head>
   <body>
     <div>
       <label>Name:</label>
       <input type="text" ng-model="yourName" placeholder="Enter a name here">
       <hr>
       <h1>Hello {{yourName}}!</h1>
     </div>
   </body>
 </html>



9. Go through example on AngularJS Main page:

  html
  ------------
  <!doctype html>
  <html ng-app="todoApp">
    <head>
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"></script>
      <script src="todo.js"></script>
      <link rel="stylesheet" href="todo.css">
    </head>
    <body>
      <h2>Todo</h2>
      <div ng-controller="TodoController">
        <span>{{remaining()}} of {{todos.length}} remaining</span>
        [ <a href="" ng-click="archive()">archive</a> ]
        <ul class="unstyled">
          <li ng-repeat="todo in todos">
            <input type="checkbox" ng-model="todo.done">
            <span class="done-{{todo.done}}">{{todo.text}}</span>
          </li>
        </ul>
        <form ng-submit="addTodo()">
          <input type="text" ng-model="todoText"  size="30"
                 placeholder="add new todo here">
          <input class="btn-primary" type="submit" value="add">
        </form>
      </div>
    </body>
  </html>

  --------

  js
  ---------
  angular.module('todoApp', [])
    .controller('TodoController', ['$scope', function($scope) {

      $scope.todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}];

      $scope.addTodo = function() {
        $scope.todos.push({text:$scope.todoText, done:false});
        $scope.todoText = '';
      };

      $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
          count += todo.done ? 0 : 1;
        });
        return count;
      };

      $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
          if (!todo.done) $scope.todos.push(todo);
        });
      };


    }]);
    -------

    css
    -------
    .done-true {
      text-decoration: line-through;
      color: grey;
    }
    ---------

   Walk through and explain what is going on


   Optionally use Chrome and download AngularJS Batarang
   Turn this on and use it to walk through what is going on in the AngualarJS app


10. Download and install Mongodb

  * MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).


11. Run mongo db

  open a command prompt and type in:

  mongod


12. Install mongoose which is the npm module used to connect to mongodb

  From this directory (mean-demo), type from a command prompt:

  npm install mongoose







































