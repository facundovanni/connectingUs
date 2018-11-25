(function ConfirmationBoxScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.components', []).factory('ConfirmationBox', ['$uibModal', function Service($uibModal) {
    var confirmationBoxInstance = {};

    confirmationBoxInstance.open = function open(modalConfiguration) {
      modalConfiguration = modalConfiguration || {};
      modalConfiguration.controller = 'ConfirmationBoxController as ctrl';
      modalConfiguration.templateUrl = 'content/components/confirmation-box/confirmation-box.html';
      modalConfiguration.size = 'sm',
        modalConfiguration.resolve = {
          title: function () { return modalConfiguration.title || 'confirmationBox.title'; }
        }
      return $uibModal.open(modalConfiguration);
    };

    return confirmationBoxInstance;
  }]);
})(window.angular);