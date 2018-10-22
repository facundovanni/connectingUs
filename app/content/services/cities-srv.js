(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Cities', ['ServicesModel', '__env', function (ServicesModel, __env) {
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/cities/?idCountry=:idCountry', null, {
                getAll: {
                    method: 'GET',
                    isArray: true,
                    param: {
                        idCountry: '@idCountry'
                    }
                }
            }));
        }]);
})(window.angular);