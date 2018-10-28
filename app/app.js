(function rootScope(angular) {
  'use strict';
  // Declare app level module which depends on views, and components
  angular.module('connectingUsCenter').controller('AppController', ['$state', function AppController($state) {
    var ctrl = this;

    ctrl.goToMyAccount= function goToMyAccount(){
      $state.go('/account', {Id: '1'});
    };

    ctrl.goToMyOffers = function goToOffers() {
      ctrl.isLoading = false;
      $state.go('/my-offers');
    }
  }]);
})(angular);
