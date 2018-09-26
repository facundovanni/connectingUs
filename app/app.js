(function rootScope(angular) {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('connectingUsCenter', [
    'ngRoute', 'ngAnimate', 'ngSanitize',
    'ngTouch', 'ui.grid',
    'auth0.auth0', 'angular-jwt', 'ui.router',
    'ui.bootstrap', 'angularSpinner', 'angularjs-dropdown-multiselect',
    'connectingUsCenter.services',
    'connectingUsCenter.home',
    'connectingUsCenter.users',
    'connectingUsCenter.materia',
    'connectingUsCenter.cronograma',
    'connectingUsCenter.asistencia',
    'connectingUsCenter.directives'
  ]).config(['$stateProvider', '$locationProvider', 'angularAuth0Provider', '$routeProvider', 'jwtOptionsProvider',
    function config($stateProvider, $locationProvider, angularAuth0Provider, $routeProvider, jwtOptionsProvider) {
      $stateProvider.state('cronograma', {
        url: '/cronograma/index',
        templateUrl: 'modules/cronograma/cronograma-grid.html'
      });
      $stateProvider.state('home-login', {
        url: '/home/login',
        templateUrl: 'modules/home/home.html'
      });
      $stateProvider.state('home', {
        url: '/home/index',
        templateUrl: 'index.html'
      });
      // Initialization for the angular-auth0 library
      angularAuth0Provider.init({
        clientID: AUTH0_CLIENT_ID,
        domain: AUTH0_DOMAIN,
        responseType: 'token id_token',
        redirectUri: AUTH0_CALLBACK_URL,
        audience: AUTH0_API_AUDIENCE,
      });

      // Configure a tokenGetter so that the isAuthenticated
      // method from angular-jwt can be used
      jwtOptionsProvider.config({
        tokenGetter: function () {
          return localStorage.getItem('id_token');
        }
      });

      $locationProvider.hashPrefix('');

      $routeProvider.otherwise({ redirectTo: '/home/index' });

    }])
    .controller('AppController',['$rootScope', 'authService','isLogged','$state', function ($rootScope, authService,isLogged, $state) {
      var that = this;
      
      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      that.logout = function logout(){
        authService.logout();
        that.isLogged = false;
        $state.go('home-login');
      }
      
      // Process the auth token if it exists and fetch the profile
      authService.handleParseHash();

      that.setLogged = function islogged() {
        that.isLogged = isLogged();
      }
      that.setLogged();

    }]);
})(angular);
