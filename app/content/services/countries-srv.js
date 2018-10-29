(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Countries', ['ServicesModel', '__env', function (ServicesModel) {
            angular.extend(this, ServicesModel.create('/api/countries', null, {
                getAll: {
                    method: 'GET',
                    isArray: true
                }
            }));
        }]);
})(window.angular);