(function MateriaConfigScope(angular) {
    'use strict';

    // tag::module[]
    angular.module('connectingUsCenter.myOffer', ['ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/myOffer', {
                templateUrl: 'modules/myOffer/templates/myOffer.html'
            });
        }]);
})(angular);