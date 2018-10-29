(function login(angular) {
    'use strict';
    angular.module('connectingUsCenter.login')
        .service('Login', ['ServicesModel', function (ServicesModel) {
            angular.extend(this, ServicesModel.create('/api/login', null, {
                getSession:{
                    method:'POST'
                }
            }));
        }]);
})(window.angular);