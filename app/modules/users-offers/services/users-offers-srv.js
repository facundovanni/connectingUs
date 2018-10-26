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

        }]);
})(window.angular);