(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.myAccount')
        .service('MyAccount', ['ServicesModel', 'User', function (ServicesModel, User) {
            var that = this;
            angular.extend(this, ServicesModel.create('/api/users', null, {

                get: {
                    method: 'GET',
                    url: '/api/users/:Id',
                    param: {
                        Id: '@Id'
                    }
                }
            }
            ));

            that.getUser = function getUser() {
                return User.getUserLogged().then(function onThen(res) {
                    return that.get({ Id: res.Id }).$promise.then(function onThen(user) {
                        return user;
                    });
                });

            };
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