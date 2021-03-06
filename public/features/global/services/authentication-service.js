/**
 * Handles Authentication for the web app
 */
doeApp.factory('AuthenticationService', ['$http','$q', '$location', '$cookies', '$rootScope',
  function ($http, $q, $location, $cookies, $rootScope) {
  return {

    /**
     * fires off the authentication request to the node middleware to authenticate with the server.
     * @param username
     * @param password
     * @returns {promise|*|promise}
     */
    authenticate: function (username, password) {
      // get a reference to the deferred object.
      var deferred = $q.defer();

      // build the authentication object for node.
      var data = {username: username, password: password};

      // fire off the request.
      $http.post('/api/login', data)
        // success
        .success(function (data) {
            $rootScope.user = data;
            deferred.resolve(data);
        })
        // error
        .error(function (data) {
            // report that a server connection error occurred.
            deferred.reject(data);
        });

      return deferred.promise;
    },

    /**
     * log the user out of the application
     * (assuming that the server is removing the cookie as part of the logout route... )
     *
     */
    logout: function() {
      // remove the user from the rootscope
      $rootScope.user = null;

      // get a reference to the deferred object.
      var deferred = $q.defer();

      // fire off the request.
      $http.post('/api/logout', {})
        // success
        .success(function (data) {
            deferred.resolve('success');
        })
        // error
        .error(function (data) {
          // report that a server connection error occurred.
          deferred.reject(data);
        });

      return deferred.promise;
    },


    /**
     * Verify that the user is still logged in.
     *
     * If there is as user on the rootscope, we assume the user is still logged in,
     * otherwise hit the server to find out for sure.
     */
    validateUserLoggedIn: function() {

      // check if user already exists on the rootscope - if so use that user
      if ($rootScope.user && $rootScope.user != null) {
        // do nothing valid
      }
      else {
        // get the user and save them if they exist, otherwise go to the login page...
        $http.get('/api/is_logged_in?time=' + Date.now(), {})
          // success
          .success(function (data) {
            if (data.loggedIn) {
              // store the user onto the root scope
              $rootScope.user = data.user;

            }
            else {
              $location.path('/login');
            }
          })
          // error
          .error(function (data) {
            $location.path('/login');
          });

      }
    }


  };




}]);