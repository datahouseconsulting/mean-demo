var ApplicationController = function($scope) {

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


};