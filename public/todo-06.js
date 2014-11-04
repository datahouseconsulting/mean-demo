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
