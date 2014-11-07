
doeApp.factory('ApplicationDisplayService', [function () {


  return {

    fieldDisabled: function (htmlId, status) {

      if (status == 'Pending') {
        return true;
      }
      else {
        return false;
      }
    }
  }




}]);