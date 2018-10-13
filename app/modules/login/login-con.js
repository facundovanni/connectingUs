(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.login').controller('LoginController', ['$state',
    function loginController($state) {
      var ctrl = this;
      console.log('loaded');
      console.log($state.get());
      ctrl.goToSignUp = function goToSignUp(){
        $state.go('/account');
      }
    }]);
})(angular);
