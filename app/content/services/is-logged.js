(function IsLoggedScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.services').service('isLogged',
        ['authService',
            function (authService) {
                return function isLogged(){
                    return authService.isAuthenticated();
                } 
            }
        ]);
})(angular)