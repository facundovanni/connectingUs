(function MateriaConfigScope(angular) {
    'use strict';

    // tag::module[]
    angular.module('connectingUsCenter.usersOffers', ['ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/offers', {
                templateUrl: 'modules/users-offers/templates/users-offers.html'
            });
        }]);
})(angular);