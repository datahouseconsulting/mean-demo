// --------------------------------------------------------------------------------------------
// This controller is used to handle the home page
//
//
// --------------------------------------------------------------------------------------------
var HomeController = function($scope, ApplicationNodeService, DTOptionsBuilder, DTColumnDefBuilder) {

  $scope.applicationList = [];

  $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
  $scope.dtColumnDefs = [
    DTColumnDefBuilder.newColumnDef(0),
    DTColumnDefBuilder.newColumnDef(1).notVisible(),
    DTColumnDefBuilder.newColumnDef(2).notSortable()
  ];



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


};