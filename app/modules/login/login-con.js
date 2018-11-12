(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.login').controller('LoginController', ['$scope', 'Login', '$translate', '$state','auth',
    function loginController($scope, Login, $translate, $state,auth) {
      var ctrl = this;
      ctrl.user = {};
      ctrl.error = false;

      ctrl.goToSignUp = function goToSignUp() {
        $state.go('/account');
      }

      ctrl.goToOffers = function goToOffers(result) {
        console.log(result);
        $state.go('/offers');
      }

      ctrl.check = function check() {
        ctrl.isLoading = true;
        auth.logIn(ctrl.user)
          .then(ctrl.goToOffers);
      };

      ctrl.onCatchLogin = function onCatchLogin() {
        ctrl.error = true;
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