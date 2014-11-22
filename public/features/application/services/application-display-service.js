// ----------------------------------------------------------------------
// Service used to manage document workflow
//
//
// -----------------------------------------------------------------------
doeApp.factory('ApplicationDisplayService', [function () {


  return {

    /**
     * Using the parameters passed, determine if this field should be disabled
     * @param htmlId
     * @param status
     *
     * @returns {boolean}
     */
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