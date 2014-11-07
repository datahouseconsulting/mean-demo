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

      // build the authentication object for node object.
      var data = {username: username, password: password};

      // fire off the request.
      $http.post('/api/login', data)
        .success(function (data) {
            $rootScope.user = data;

            deferred.resolve(data);
        })
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
        .success(function (data) {
            deferred.resolve('success');
        })
        .error(function (data) {
          // report that a server connection error occurred.
          deferred.reject(data);
        });

      return deferred.promise;
    },


    /**
     * check if the user is logged in (user stored in rootscope)
     * if not, then try get the user from the server
     * if they arent logged in you will get a 401
     *
     * return the current user
     *
     */
//    validateUserLoggedIn: function(callback, scope) {
//
//      // check if user already exists on the rootscope - if so use that user
//      if ($rootScope.user && $rootScope.user != null) {
//        // if there is a callback function then call it now
//        if (callback) {
//          callback();
//        }
//      }
//      else {
//        // get the user and save them if they exist, otherwise go to the login page...
//        $http.get(serverConfig.getIsLoggedInUrl(), {})
//          .success(function (data) {
//            // make sure it returned successfully
//            if (data.status == serverConfig.serverStatusCodes.SUCCESS) {
//              // store the user onto the root scope
//              $rootScope.user = data.data.user;
//
//              // check if the user is impersonating someone
//              var pretendUserId = $cookies.pretendUserId;
//
//              // if so then update the user object
//              if (pretendUserId != undefined) {
//                // save the actual user - this will be added to the user object
//                var actualUser = angular.copy($rootScope.user);
//
//                // match the pretend user to a user on the user object, to get all of that users information
//                for (var i = 0; i < $rootScope.user.pretendAsUsers.length; i++) {
//                  if ($rootScope.user.pretendAsUsers[i].userId == pretendUserId) {
//                    $rootScope.user = $rootScope.user.pretendAsUsers[i];
//                    $rootScope.user.actualUser = actualUser;
//                  }
//                }
//              }
//
//              // clean and save the list of projects the user has access to
//              $rootScope.user.projectList = ProjectListService.cleanProjectList(data.data.projects, false, true);
//              $rootScope.user.itemProjectList = ProjectListService.cleanProjectList(data.data.projects, false, false);
//
//              // if there is a callback function then call it now
//              if (callback) {
//                callback();
//              }
//            }
//            else {
//              // go to the login page if this user isnt logged in
//              $location.path('/login');
//              scope.$parent.loginFlag = false;
//            }
//          })
//          .error(function (data) {
//            // go to the login page in the case of an error...
//            // or should we display an error???
//            $location.path('/login');
//            scope.$parent.loginFlag = false;
//
//          });
//
//      }
//    }


  };




}]);