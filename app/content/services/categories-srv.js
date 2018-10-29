(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Categories', ['ServicesModel', function (ServicesModel) {
            angular.extend(this, ServicesModel.create('/api/categories', null, {
                getAll:{
                    method:'GET',
                    isArray:true
                }
            }));
        }]);
})(window.angular);