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

  // mock data
  $scope.islandList = [
    {name: 'Oahu'},
    {name: 'Maui'}
  ];

  // mock data
  $scope.districtListAll = [
    {islandName: 'Oahu', name: 'Honolulu'},
    {islandName: 'Oahu', name: 'Pearl City'},
    {islandName: 'Oahu', name: 'Aiea'},
    {islandName: 'Oahu', name: 'Central'},
    {islandName: 'Maui', name: 'Maui County'}
  ];


  $scope.schoolListAll = [

    {districtName: 'Honolulu', name: 'Mckinley HS'},
    {districtName: 'Honolulu', name: 'Washington MS'},
    {districtName: 'Honolulu', name: 'Kaimuki HS'},
    {districtName: 'Pearl City', name: 'Pearl City HS'},
    {districtName: 'Pearl City', name: 'Highlands MS'},
    {districtName: 'Aiea', name: 'Aiea HS'},
    {districtName: 'Central', name: 'Moanalua HS'},
    {districtName: 'Central', name: 'Central MS'},
    {districtName: 'Maui County', name: 'Maui MS'},
    {districtName: 'Maui County', name: 'Maui HS'},
  ];



  // default island
  $scope.selectedIsland = $scope.islandList[0];

  /**
   * someone selected a diff island
   */
  $scope.islandChanged = function () {
    // always start with this ?
    $scope.districtList = [ ];

    console.log($scope.selectedIsland.name);
    // use a filter here instead of a for loop
    for (var i = 0; i < $scope.districtListAll.length; i++) {

      console.log($scope.districtListAll[i].islandName);
//      console.log();
      if ($scope.districtListAll[i].islandName == $scope.selectedIsland.name) {
        $scope.districtList.push($scope.districtListAll[i]);
      }
    }

    $scope.selectedDistrict = $scope.districtList[0];
    $scope.districtChanged();
  }



  // mock data
  $scope.districtList = [
    {islandName: 'Oahu', name: 'Honolulu'},
    {islandName: 'Oahu', name: 'Pearl City'},
    {islandName: 'Oahu', name: 'Aiea'},
    {islandName: 'Oahu', name: 'Central'}
  ];

  // default district
  $scope.selectedDistrict = $scope.districtList[0];

  // mock data
  $scope.schoolList = [
    {districtName: 'Honolulu', name: 'Mckinley HS'},
    {districtName: 'Honolulu', name: 'Washington MS'},
    {districtName: 'Honolulu', name: 'Kaimuki HS'}
  ];

  // default school
  $scope.selectedSchool = $scope.schoolList[0];

  /**
   * someone selected a diff district
   */
  $scope.districtChanged = function () {
    // always start with this ?
    $scope.schoolList = [ ];

    // use a filter here instead of a for loop
    for (var i = 0; i < $scope.schoolListAll.length; i++) {
//      console.log();
      if ($scope.schoolListAll[i].districtName == $scope.selectedDistrict.name) {
        $scope.schoolList.push($scope.schoolListAll[i]);
      }
    }

    $scope.selectedSchool = $scope.schoolList[0];
  }




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