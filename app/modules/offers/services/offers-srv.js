(function offersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.offers')
        .service('Offers', ['ServicesModel', '__env', function (ServicesModel, __env) {
            var that = this;
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/services', null, {
                getAll: {
                    url:__env.apiUrl + '/api/services/search',
                    method: 'POST',
                    isArray: true
                }
            }));

        }]);
})(window.angular);