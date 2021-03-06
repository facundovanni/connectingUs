(function MateriaConfigScope(angular) {
    'use strict';

    // tag::module[]
    angular.module('connectingUsCenter.myAccount', ['ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/account', {
                templateUrl: 'modules/myAccount/templates/myAccount-crud.html',
                controller: 'myAccountCRUDController as ctrl'
            });
            $routeProvider.when('/register', {
                templateUrl: 'modules/myAccount/templates/myAccount-crud.html',
                controller: 'myAccountCRUDController as ctrl'
            });
        }]);
})(angular);