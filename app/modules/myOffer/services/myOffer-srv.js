(function login(angular) {
    'use strict';
    angular.module('connectingUsCenter.myOffer')
        .service('MyOffer', ['ServicesModel', '__env', function (ServicesModel, __env) {
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/services/:id', null, {
                get:{
                    method:'GET',
                    params:{
                        id: 1,
                    }
                }
            }));
        }]);
})(window.angular);