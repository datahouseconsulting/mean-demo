var ApplicationController = function($scope, $location, ApplicationNodeService, ApplicationDisplayService, AuthenticationService) {

  // check to make sure the user is logged in - if not, then exit to login page...
  AuthenticationService.validateUserLoggedIn();

  //default pages to display
  $scope.page = {
    visiblePage: 'guidelines',
    applicationSection: '1'
  }

  // pull any search params from the top url
  var searchParams = $location.search();

  // if theres an id passed, then get get that document
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
  // otherwise start with a blank application
  else {
    $scope.application = {
      status: 'New'
    };
  }


  // default user for now - eventually used the the logged in user information
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


  /**
   * return to the main home listing
   *
   */
  $scope.close = function () {
    $location.path('/home');
  }

  /**
   * switch sections within the application
   *
   **/
  $scope.changeSection = function (section) {
    $scope.page.applicationSection = section;
  }

  /**
   * check whether to disable the selected field
   *
   * We are actually calling a service for this
   **/
  $scope.fieldDisabled = function(htmlId) {
    // if the status hasnt been set yet, then disable the field
    if (!$scope.application.status) {
      return true;
    }
    else {
      return ApplicationDisplayService.fieldDisabled(htmlId, $scope.application.status);
    }
  }


  /**
   * Save the application
   *
   * (first run through page validations
   */
  $scope.save = function () {
    // validate fields by marking them as dirty
    $scope.appForm.title.$dirty = true;
    $scope.appForm.objective.$dirty = true;
    $scope.appForm.description.$dirty = true;

    // angular doesnt do this (it really should) so we do this ourselves manually
    $('#description').addClass('ng-dirty');
    $('#objective').addClass('ng-dirty');
    $('#title').addClass('ng-dirty');

    // go thru each field and check if its valid
    if ($scope.appForm.title.$invalid) {
      $scope.changeSection('1');
      $('#title').focus();
    }
    else if ($scope.appForm.objective.$invalid) {
      $scope.changeSection('1');
      $('#objective').focus();
    }
    else if ($scope.appForm.description.$invalid) {
      $scope.changeSection('1');
      $('#description').focus();
    }
    // if all the fields are valid, then save the application
    else {
      ApplicationNodeService.createApplication($scope.application).then(
        // success
        function (data) {
          // return home after successful save
          $location.path('/home');
        },
        //err
        function (err) {
          alert('=' + JSON.stringify(err) + '=');
        }
      );
    }

  }


  /**
   * Submit the application
   */
  $scope.submit = function () {
    alert('--submit--');
  }

};