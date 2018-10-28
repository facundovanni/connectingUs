(function login(angular) {
    'use strict';
    angular.module('connectingUsCenter.myOffer')
        .service('MyOffer', ['ServicesModel', '__env', function (ServicesModel, __env) {
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/services', null, {
                getService: {
                    method: 'GET',
                    url: __env.apiUrl + '/api/services/?idService=:idService',
                    isArray: true,
                    param: {
                        idService: '@idService'
                    }
                }
            }))
        }]);
})(window.angular);