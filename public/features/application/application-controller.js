var ApplicationController = function($scope, $location, ApplicationNodeService, ApplicationDisplayService) {

  //default to guidelines page
  $scope.page = {
    visiblePage: 'guidelines',
    applicationSection: '1'
  }




  // pull any search params from the top url (documentId)
  var searchParams = $location.search();

  // if theres an id passed, then get it
  if (searchParams.applicationId) {

    ApplicationNodeService.getApplication(searchParams.applicationId).then(
      // success
      function (data) {
        $scope.application = data;
      },
      //err
      function (err) {
        alert('=' + JSON.stringify(err) + '=');
      }
    );
  }
  else {
    // start with a blank application
    $scope.application = {
      status: 'New'
    };
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

  $scope.fieldDisabled = function(htmlId) {
    if (!$scope.application.status) {
      return true;
    }
    else {
      return ApplicationDisplayService.fieldDisabled(htmlId, $scope.application.status);
    }

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
      ApplicationNodeService.createApplication($scope.application).then(
        // success
        function (data) {
          $location.path('/home');
        },
        //err
        function (err) {
          alert('=' + JSON.stringify(err) + '=');
        }
      );
    }

  }

  $scope.submit = function () {
    alert('--submit--');
  }

};