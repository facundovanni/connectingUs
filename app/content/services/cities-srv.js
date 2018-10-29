(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Cities', ['ServicesModel', '__env', function (ServicesModel, __env) {
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/cities', null, {
                getAll: {
                    method: 'GET',
                    url:__env.apiUrl + '/api/cities/?idCountry=:idCountry',
                    isArray: true,
                    param: {
                        idCountry: '@idCountry'
                    }
                }
            }));
        }]);
})(window.angular);