(function UsersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('User', ['ServicesModel', function (ServicesModel) {
            var ctrl = this;
            var cachePromise;
            angular.extend(this, ServicesModel.create('/api/users/profile/?id=:id', null, {
                get: {
                    method: 'GET',
                    param: {
                        id: '@id'
                    }
                },
                getLogged:{
                    method:'GET',
                    url:'/api/login/userlogged'
                }
            }));

            ctrl.getUserLogged = function getUserLogged(){
                if(!cachePromise){
                    cachePromise = ctrl.getLogged().$promise.then(function onThen(res){
                        return res;
                    })
                }
                return cachePromise;  
            };
        }]);
})(window.angular);