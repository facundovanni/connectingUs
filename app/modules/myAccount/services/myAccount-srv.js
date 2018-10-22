(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.myAccount')
        .service('MyAccount', ['ServicesModel','__env', function (ServicesModel, __env) {
            var that = this;
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/users/:id', null, {}
            ));


            that.getDefaultEntity = function getDefaultEntity() {
                return {
                    id: undefined,
                    firstname: undefined,
                    lastname: undefined,
                    dateOfBirth: undefined,
                    gender: undefined,
                    nationality: undefined,
                    countryofresidence: undefined,
                    city: undefined,
                    account: {
                        mail: undefined,
                        password: undefined,
                        nickname: undefined
                    },
                    phonenumber: undefined,
                    phonetype: undefined
                };
            };
        }]);
})(window.angular);