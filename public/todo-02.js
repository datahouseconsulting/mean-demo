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
