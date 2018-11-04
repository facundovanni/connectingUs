(function HomeConfigScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.about', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/about', {
                templateUrl: 'modules/about/templates/about.html'
            });
        }]);
})(angular);