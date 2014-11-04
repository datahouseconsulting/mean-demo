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
