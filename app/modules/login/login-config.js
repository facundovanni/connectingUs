(function HomeConfigScope(angular) {
    'use strict';
    // tag::module[]
    angular.module('connectingUsCenter.login', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'modules/login/templates/login.html'
            });
        }]);
})(angular);