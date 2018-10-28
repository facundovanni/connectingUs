(function usersOffersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.usersOffers')
        .service('UsersOffers', ['ServicesModel', '__env', function (ServicesModel, __env) {
            var that = this;
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/services', null, {
                get: {
                    method: 'GET',
                    isArray: true
                }
            }));

        }]);
})(window.angular);