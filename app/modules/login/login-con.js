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
        ctrl.isLoading = false;
        $state.go('/users-offers');
      }

      ctrl.check = function check() {
        ctrl.isLoading = true;
        Login.save().$promise
          .then(ctrl.goToOffers)
          .catch(ctrl.onCatchLogin)
          .finally(ctrl.finallyLogin);
      };

      ctrl.onCatchLogin = function onCatchLogin() {

      };

      ctrl.finallyLogin = function finallyLogin(){
        ctrl.isLoading = false;
        ctrl.goToOffers(); //MOCK
      }
      ctrl.singIn = function singIn() {
        if (ctrl.user.email && ctrl.user.password) {
          ctrl.check();
        }
      };

    }]);
})(angular);