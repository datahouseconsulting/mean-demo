// --------------------------------------------------------------------------------------------
// This controller is used to handle the home page
//
//
// --------------------------------------------------------------------------------------------
var HomeController = function($scope, ApplicationNodeService, AuthenticationService, $location, DTOptionsBuilder, DTColumnDefBuilder) {


  // check to make sure the user is logged in - if not, then exit to login page...
  AuthenticationService.validateUserLoggedIn();

  // default to a blank list
  $scope.applicationList = [];

  // options for the datatable
  $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);

  // populate the list of applications on the page
  ApplicationNodeService.getApplicationList().then(
    // success
    function (data) {
      $scope.applicationList = data;
    },
    //err
    function (err) {
      alert('=' + JSON.stringify(err) + '=');
    }
  );


  /**
   * logout of the web app
   *
   */
  $scope.logout = function() {
    AuthenticationService.logout().then(
      // success
      function(data) {
        $location.path('/login');

      },
      // error
      function(err) {
        alert('=' + JSON.stringify(err) + '=');
      }
    );
  }




};