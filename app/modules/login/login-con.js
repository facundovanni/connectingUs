(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.login').controller('LoginController', ['$scope', 'Login', '$translate', '$state',
    function loginController($scope, Login, $translate, $state) {
      var ctrl = this;
      ctrl.user = {};

      ctrl.goToSignUp = function goToSignUp() {
        $state.go('/account');
      }

      ctrl.goToOffers = function goToOffers(result) {
        $state.go('/offers');
      }

      ctrl.check = function check() {
        ctrl.isLoading = true;
        Login.getSession(ctrl.user).$promise
          .then(ctrl.goToOffers)
          .finally(ctrl.finallyLogin);
      };

      ctrl.onCatchLogin = function onCatchLogin() {

      };

      ctrl.finallyLogin = function finallyLogin(){
        ctrl.isLoading = false;
      }
      ctrl.singIn = function singIn() {
        if (ctrl.user.Mail && ctrl.user.Password && ctrl.user.Password.length > 7) {
          ctrl.check();
        }
      };

    }]);
})(angular);