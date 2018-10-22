(function usersOffersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.usersOffers')
        .service('UsersOffers', ['ServicesModel', function (ServicesModel) {
            var that = this;
            angular.extend(this, ServicesModel.create('/api/services/search/:filters', null, {
                get:{
                    method:'GET',
                    params:{
                        filters: '@filters'
                    }
                }
            }));


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