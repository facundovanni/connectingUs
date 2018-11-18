(function rootScope(angular) {
  'use strict';
  // Declare app level module which depends on views, and components
  angular.module('connectingUsCenter')
  .controller('AppController', ['$state','auth','session', function AppController($state,auth,session) {
    var ctrl = this;

    ctrl.goToMyAccount= function goToMyAccount(){
      $state.go('/account', {Id: session.getUser().Id});
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
