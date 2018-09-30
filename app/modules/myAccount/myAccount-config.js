(function MateriaConfigScope(angular) {
    'use strict';

    // tag::module[]
    angular.module('connectingUsCenter.myAccount', ['ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/myAccount', {
                templateUrl: 'modules/myAccount/myAccount-crud.html',
                controller: 'myAccountCRUDController as ctrl'
            });
        }]);
})(angular);