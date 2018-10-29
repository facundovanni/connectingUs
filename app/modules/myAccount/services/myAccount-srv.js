(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.myAccount')
        .service('MyAccount', ['ServicesModel', '__env', function (ServicesModel, __env) {
            var that = this;
            angular.extend(this, ServicesModel.create(__env.apiUrl + '/api/users', null, {

                get: {
                    method: 'GET',
                    url: __env.apiUrl + '/api/users/:id',
                    params: {
                        id: '@id'
                    }
                }
            }
            ));


            that.getDefaultEntity = function getDefaultEntity() {
                return {
                    Id: undefined,
                    FirstName: undefined,
                    LastName: undefined,
                    DateOfBirth: undefined,
                    Gender: undefined,
                    CountryOfBirth: undefined,
                    CountryOfResidence: undefined,
                    CityOfResidence: undefined,
                    Account: {
                        Mail: undefined,
                        Password: undefined,
                        Nickname: undefined
                    },
                    Phonenumber: undefined,
                    Phonetype: undefined,
                    PhoneAreaCode: undefined
                };
            };
        }]);
})(window.angular);