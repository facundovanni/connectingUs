(function myOffersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.myOffers')
        .service('MyOffers', ['ServicesModel', function (ServicesModel) {
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