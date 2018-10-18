(function myAccountScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Countries', ['ServicesModel', '__env', function (ServicesModel, __env) {
            angular.extend(this, ServicesModel.create(__env.apiUrl+ '/api/countries', null, {}));
        }]);
})(window.angular);