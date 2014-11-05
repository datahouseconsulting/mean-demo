/* (1) =============================================================================== */
/* =================================================================================== */
angular.module('app', [])
  .controller('TodoController', ['$scope', function($scope) {

  }]);
/* (2) =============================================================================== */
/* =================================================================================== */
angular.module('app', [])
  .controller('TodoController', ['$scope', function($scope) {

    $scope.todoList = [
      { text: 'Buy Milk'},
      { text: 'Pick up kids from school'},
      { text:  'Go to the bank'}
    ];

    $scope.add = function() {
      $scope.todoList.push({text: $scope.newTodo});
    };

  }]);
/* (3) =============================================================================== */
/* =================================================================================== */
angular.module('app', [])
  .controller('TodoController', ['$scope', function($scope) {

    $scope.todoList = [
      { text: 'Buy Milk'},
      { text: 'Pick up kids from school'},
      { text:  'Go to the bank'}
    ];

    $scope.add = function() {
      $scope.todoList.push({text: $scope.newTodo});
      $scope.newTodo = '';
    };

  }]);
/* (4) =============================================================================== */
/* =================================================================================== */
angular.module('app', ['ngResource'])
  .controller('TodoController', ['$scope', '$resource', function($scope, $resource) {

    var Todo = $resource('/api/todo');

    $scope.todoList = [
      { text: 'Buy Milk'},
      { text: 'Pick up kids from school'},
      { text:  'Go to the bank'}
    ];

    $scope.add = function() {
      var todo = new Todo();
      todo.text = $scope.newTodo;
      todo.$save();
    };

  }]);
/* (5) =============================================================================== */
/* =================================================================================== */
angular.module('app', ['ngResource'])
  .controller('TodoController', ['$scope', '$resource', function($scope, $resource) {

    var Todo = $resource('/api/todo');

    $scope.todoList = [
      { text: 'Buy Milk'},
      { text: 'Pick up kids from school'},
      { text:  'Go to the bank'}
    ];

    $scope.add = function() {
      var todo = new Todo();
      todo.text = $scope.newTodo;
      todo.$save(function(result) {
        $scope.todoList.push(result);
        $scope.newTodo = '';
      });
    };

  }]);
/* (6) =============================================================================== */
/* =================================================================================== */
angular.module('app', ['ngResource'])
  .controller('TodoController', ['$scope', '$resource', function($scope, $resource) {

    var Todo = $resource('/api/todo');

    $scope.todoList = [];

    Todo.query(function(result){
      $scope.todoList = result; 
    });

    $scope.add = function() {
      var todo = new Todo();
      todo.text = $scope.newTodo;
      todo.$save(function(result) {
        $scope.todoList.push(result); 
        $scope.newTodo = '';
      });
    };

  }]);
