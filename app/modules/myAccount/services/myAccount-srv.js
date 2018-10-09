(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.myAccount')
        .service('MyAccount', ['ServicesModel', function (ServicesModel, WebApi) {
            var that = this;
            angular.extend(this, ServicesModel.create('https://appdbtest.azurewebsites.net/api/users', null, {
            }
            ));


            that.getDefaultEntity = function getDefaultEntity() {
                return {
                    id: undefined,
                    firstname: undefined,
                    lastname: undefined,
                    dateofbirth: undefined,
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