(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.myOffer').controller('MyOfferController', ['$scope', 'MyOffer', '$translate', '$state',
    function MyOfferController($scope, MyOffer, $translate, $state) {
      var ctrl = this;
      ctrl.isLoading = false;

      ctrl.offer = {};

      ctrl.getService = function getService(idService) {
        ctrl.isLoading = true;
        MyOffer.getService({ idService: idService }).$promise
          .then(ctrl.setOffer)
          .catch(ctrl.onCatchAccount)
          .finally(ctrl.onFinallyService);
      };

      ctrl.setOffer = function setOffer(result) {
        ctrl.offer = result[0];
      };


      ctrl.onFinallyService = function onFinallyService() {
        ctrl.isLoading = false;
      };

      ctrl.init = function init() {
        //The service id is hardcoded for now.
        ctrl.getService(5);
      };

      ctrl.init();
    }]);
})(angular);