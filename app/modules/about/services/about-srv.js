(function about(angular) {
    'use strict';
    angular.module('connectingUsCenter.about')
        .service('About', ['ServicesModel', function (ServicesModel) {
            // angular.extend(this, ServicesModel.create('/api/countries/map', null, {
            //     getAll: {
            //         method: 'GET',
            //         isArray: true
            //     }
            // }));
        }]);
})(window.angular);