(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Cities', ['ServicesModel', function (ServicesModel) {
            angular.extend(this, ServicesModel.create('/api/cities', null, {
                getAll: {
                    method: 'GET',
                    url:'/api/cities/?idCountry=:idCountry',
                    isArray: true,
                    param: {
                        idCountry: '@idCountry'
                    }
                }
            }));
        }]);
})(window.angular);