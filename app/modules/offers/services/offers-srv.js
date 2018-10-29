(function offersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.offers')
        .service('Offers', ['ServicesModel', function (ServicesModel) {
            var that = this;
            angular.extend(this, ServicesModel.create('/api/services', null, {
                getAll: {
                    method: 'POST',
                    url:'/api/services/search',
                    isArray: true
                },
                getService: {
                    method: 'GET',
                    url:'/api/services/?idService=:idService',
                    isArray: true,
                    param: {
                        idService: '@idService'
                    }
                }
            }));

        }]);
})(window.angular);