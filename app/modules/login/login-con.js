(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.login').controller('LoginController', ['$state', '$rootScope', '$window',
    function loginController($state, $rootScope, $window) {
      var ctrl = this;
      ctrl.user = {};
      ctrl.error = false;

      ctrl.goToSignUp = function goToSignUp() {
        $state.go('/register');
      }

      ctrl.goToOffers = function goToOffers() {
        $state.go('/offers');
      }

      ctrl.onCatchLogin = function onCatchLogin(result) {
        ctrl.error = true;
        ctrl.isLoading = false;
      };

      ctrl.check = function check() {
        ctrl.isLoading = true;
        $rootScope.auth.logIn(ctrl.user)
          .then(ctrl.onLoginSuccess)
          .catch(ctrl.onCatchLogin);
      };

      ctrl.onLoginSuccess = function onLoginSuccess() {
        $window.location.reload();
      }

      ctrl.singIn = function singIn() {
        if (ctrl.user.Mail && ctrl.user.Password && ctrl.user.Password.length > 7) {
          ctrl.check();
        }
      };

      ctrl.init = function init() {
        if ($rootScope.auth.isLoggedIn()) {
          ctrl.goToOffers();
        }
      }
      ctrl.init();
    }]);
})(angular);