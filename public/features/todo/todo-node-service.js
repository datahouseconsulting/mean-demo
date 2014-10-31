/**
 * Handles communications with the node middleware for article information.
 */
todoApp.factory('TodoNodeService', ['$http', '$q', function ($http, $q) {

  return {
    createTodo: function (todo) {
      // build a deferred object reference.
      var deferred = $q.defer();

      // build a config object to add custom headers to the request.
      var config = {
        headers: {
          "Content-Type" : "application/json"
        }
      }
      // fire off the update post to the node middleware.
      $http.post('http://127.0.0.1:8000/todos', todo, config)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          // A communication error occurred.. report and error.
          deferred.reject(data);
        });

      return deferred.promise;
    },


    getToDoList: function () {
      // build a deferred object reference.
      var deferred = $q.defer();

      // build a config object to add custom headers to the request.
      var config = {
        headers: {
          "Content-Type" : "application/json"
        }
      }

      // fire off the update post to the node middleware.
      $http.get('http://127.0.0.1:8000/todos', config)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          // A communication error occurred.. report and error.
          deferred.reject(data);
        });

      return deferred.promise;
    }
  };
}]);

