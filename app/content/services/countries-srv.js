(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Countries', ['ServicesModel', function (ServicesModel) {
            angular.extend(this, ServicesModel.create('/api/countries', null, {}));
        }]);
})(window.angular);