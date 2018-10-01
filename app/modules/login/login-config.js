(function HomeConfigScope(angular) {
    'use strict';
    // tag::module[]
    angular.module('connectingUsCenter.login', ['ngResource', 'ui.router'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'modules/login/templates/login.html'
            });
        }]);
})(angular);