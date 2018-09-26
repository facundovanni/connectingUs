(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.home').controller('HomeController', ['authService', '$http', '$state',
    function homeController(authService, $http, $state) {
      var vm = this;
      vm.auth = authService;

      vm.go = function go() {
        $state.go('cronograma');
      };
      
      vm.autenticar = function autenticar() {

        if (!authService.isAuthenticated()) {
          authService.login();
          $state.go('home');
        }
      };
    }]);
})(angular);
