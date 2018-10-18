(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.login').controller('LoginController', ['$scope', 'Login', '$translate', '$state',
    function loginController($scope, Login, $translate, $state) {
      var ctrl = this;
      ctrl.user = {};

      ctrl.goToSignUp = function goToSignUp() {
        $state.go('/account');
      }

      ctrl.goToOffers = function goToOffers() {
        $state.go('/users-offers');
      }

      ctrl.getAccount = function getAccount() {
        ctrl.isLoading = true;
        Login.get().$promise
          .then(ctrl.setUser)
          .catch(ctrl.onCatchAccount)
          .finally(ctrl.setView);
      };
      ctrl.singIn = function singIn() {
        if (ctrl.user.email && ctrl.user.password) {
          ctrl.goToOffers();
        }
      };

    }]);
})(angular);