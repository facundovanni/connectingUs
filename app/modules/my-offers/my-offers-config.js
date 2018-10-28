(function MateriaConfigScope(angular) {
    'use strict';

    // tag::module[]
    angular.module('connectingUsCenter.myOffers', ['ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/my-offers', {
                templateUrl: 'modules/my-offers/templates/my-offers.html'
            });
        }]);
})(angular);