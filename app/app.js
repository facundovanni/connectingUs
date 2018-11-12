(function rootScope(angular) {
  'use strict';
  // Declare app level module which depends on views, and components
  angular.module('connectingUsCenter').controller('AppController', ['$state','auth', function AppController($state,auth) {
    var ctrl = this;

    ctrl.goToMyAccount= function goToMyAccount(){
      $state.go('/account', {Id: 1});
    };

    ctrl.goToMyOffers = function goToOffers() {
      $state.go('/my-offers');
    };

    ctrl.logout = function logout() {
      auth.logOut();
      $state.go('/login');
    };

    ctrl.goToAbout = function goToAbout() {
      $state.go('/about');
    }
  
  }]);
})(angular);
