(function UsersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('User', ['ServicesModel', function (ServicesModel) {
            angular.extend(this, ServicesModel.create('/api/users/profile/?id=:id', null, {
                get: {
                    method: 'GET',
                    param: {
                        id: '@id'
                    }
                }
            }));
        }]);
})(window.angular);