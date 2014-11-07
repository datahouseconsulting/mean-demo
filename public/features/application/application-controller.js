var ApplicationController = function($scope, $location) {

  //default to guidelines page
  $scope.page = {
    visiblePage: 'guidelines',
    applicationSection: '1'
  }


  $scope.user = {
    name: 'DOE, John',
    address: '1390 Miller St.',
    city: 'Honolulu',
    state: 'HI',
    country: 'USA',
    zip: '96813',
    email: 'John_doe@notes.k12.hi.use',
    phone: '808-123-4567'
  }


  $scope.close = function () {
    $location.path('/home');
  }

  $scope.changeSection = function (section) {
    $scope.page.applicationSection = section;
  }

  $scope.save = function () {
    // validate fields
    $scope.appForm.title.$dirty = true;
    $scope.appForm.objective.$dirty = true;
    $scope.appForm.description.$dirty = true;

    $('#description').addClass('ng-dirty');
    $('#objective').addClass('ng-dirty');
    $('#title').addClass('ng-dirty');

    if ($scope.appForm.title.$invalid) {
      $('#title').focus();
    }
    else if ($scope.appForm.objective.$invalid) {
      $('#objective').focus();
    }
    else if ($scope.appForm.description.$invalid) {
      $('#description').focus();
    }
    else {
      alert('--save--');

    }

  }

  $scope.submit = function () {
    alert('--submit--');
  }

};