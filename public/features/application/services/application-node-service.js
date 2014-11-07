/**
 * Handles communications with the node middleware for purchase requisition information.
 */
doeApp.factory('ApplicationNodeService', ['$http', '$q', function ($http, $q) {


  return {

    getApplication: function (applicationId) {
      // build a deferred object reference.
      var deferred = $q.defer();

      $http.get('/api/applications/' + applicationId + '?time=' + Date.now())
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    },


    /**
     * Get a list of applications
     *
     */
    getApplicationList: function () {
      // build a deferred object reference.
      var deferred = $q.defer();
      $http.get('/api/applications?time=' + Date.now())
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    },


    createApplication: function (application) {
      // new apps start as pending
      application.status = 'Pending';

      // get a reference to the deferred object.
      var deferred = $q.defer();

      $http.post('/api/applications', application)
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (data) {
          // report that a server connection error occurred.
          deferred.reject(data);
        });

      // return the promise object which will be filled in when the
      // request finishes.
      return deferred.promise;
    }




  };
}]);



//  return {
//
//
//    angular.module('app', ['ngResource'])
//  .controller('TodoController', ['$scope', '$resource', function($scope, $resource) {
//
//    var Todo = $resource('/api/todo');
//
//    $scope.todoList = [];
//
//    Todo.query(function(result){
//      $scope.todoList = result;
//    });
//
//    $scope.add = function() {
//      var todo = new Todo();
//      todo.text = $scope.newTodo;
//      todo.$save(function(result) {
//        $scope.todoList.push(result);
//        $scope.newTodo = '';
//      });
//    };
//
//  }]);
