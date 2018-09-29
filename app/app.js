(function rootScope(angular) {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('connectingUsCenter', [
    'ngRoute', 'ngAnimate', 'ngSanitize',
    'ngTouch', 'ui.grid', 'ui.router',
    'ui.bootstrap', 'angularSpinner', 'angularjs-dropdown-multiselect',
    'connectingUsCenter.services',
    'connectingUsCenter.login',
    'connectingUsCenter.myAccount',
    'connectingUsCenter.directives'
  ]).config(['$stateProvider', '$locationProvider', '$routeProvider',
    function config($stateProvider, $locationProvider, $routeProvider) {
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'modules/login/login.html'
      });
      $stateProvider.state('myAccount', {
        url: '/myAccount',
        templateUrl: 'modules/myAccount/myAccount-crud.html'
      });

      $locationProvider.hashPrefix('');

      $routeProvider.otherwise({ redirectTo: '/login' });

    }])
    .controller('AppController',['$rootScope','$state', function ($rootScope, $state) {
      
    }]);
})(angular);
