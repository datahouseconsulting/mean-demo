/**
 * Handles communications with the node middleware for purchase requisition information.
 */
doeApp.factory('ApplicationNodeService', ['$http', '$q', function ($http, $q) {


  return {

    /**
     * Get the single application using an id
     *
     * @param applicationId
     */
    getApplication: function (applicationId) {
      // build a deferred object reference.
      var deferred = $q.defer();

      // GET request to get the application as json
      // using a timestamp so that the request isnt cached
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

      // GET request to get the application list
      // using a timestamp so that the request isnt cached
      $http.get('/api/applications?time=' + Date.now())
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    },


    /**
     * Create a new application
     * @param application
     *
     * pass back the newly created app, along with the generated id if successfull
     */
    createApplication: function (application) {
      // new apps start as pending
      application.status = 'Pending';

      // get a reference to the deferred object.
      var deferred = $q.defer();

      // POST to the application api
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


