// --------------------------------------------------------------------------------------------
// This controller is used to handle logging into the app
//
// --------------------------------------------------------------------------------------------
var LoginController = function($scope, $location, AuthenticationService, $rootScope) {

  $scope.invalidLogin = false;


  // attempt to login using the username and password provided
  $scope.login = function(username, password) {

      // fire off the authentication request to the node server.
      AuthenticationService.authenticate(username, password).then(
        // successfully authenticated
        function(data) {

            // redirect by default to the home view.
            $location.path('/home');

        },
        // didn't authenticate, and passing the reason back
        function(err) {
          $scope.invalidLogin = true;
          $scope.user.username = '';
          $scope.user.password = '';
        }
      );
    }



};