var todoApp = angular.module('todoApp', []);

todoApp
  .controller('TodoController', ['$scope', 'TodoNodeService', function($scope, TodoNodeService) {


    /**
     * Load the list of todos from the mongodb
     */
    TodoNodeService.getToDoList().then(
      // success
      function(data) {
        $scope.todos = data;
      },
      // failure
      function(err) {
        alert('Error loading Todo List');
      }
    );


    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.todoText, done:false});
      // send it to node
      TodoNodeService.createTodo({text: $scope.todoText, done: false}).then(
        // success
        function(data) {
          // show an indicator that the to do was added
          toastr.info('Todo has been added');
        },
        // failure
        function(err) {
          alert('Error adding Todo');
        }
      );

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