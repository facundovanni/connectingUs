(function login(angular) {
    'use strict';
    angular.module('connectingUsCenter.myOffer')
        .service('MyOffer', ['ServicesModel', '__env', function (ServicesModel, __env) {
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/services/?idService=:idService', null, {
                getService: {
                    method: 'GET',
                    isArray: true,
                    param: {
                        idService: '@idService'
                    }
                }
            }));
        }]);
})(window.angular);