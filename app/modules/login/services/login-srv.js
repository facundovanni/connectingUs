(function login(angular) {
    'use strict';
    angular.module('connectingUsCenter.login')
        .service('Login', ['ServicesModel', '__env', function (ServicesModel, __env) {
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/login', null, {
                getSession:{
                    method:'POST'
                }
            }));
        }]);
})(window.angular);