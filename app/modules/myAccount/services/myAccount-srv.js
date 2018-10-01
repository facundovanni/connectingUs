(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.myAccount')
        .service('MyAccount', ['ServicesModel', function (ServicesModel) {
            var that = this;
            angular.extend(this, ServicesModel.create('/api/users', null, {}));


            that.getDefaultEntity = function getDefaultEntity() {
                return {
                    id: undefined,
                    fistName: undefined,
                    lastName: undefined,
                    nickName: undefined,
                    dayOfBirth: undefined,
                    gender: undefined,
                    nationality: undefined,
                    country: undefined,
                    city: undefined,
                    email: undefined,
                    phone:{}
                };
            };
        }]);
})(window.angular);