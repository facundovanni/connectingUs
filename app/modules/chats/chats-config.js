(function MateriaConfigScope(angular) {
    'use strict';

    // tag::module[]
    angular.module('connectingUsCenter.chats', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/chats', {
                    url: '/chats',
                    templateUrl: 'modules/chats/templates/chats.html'
                })
        }]);

})(angular);