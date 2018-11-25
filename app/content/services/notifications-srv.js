(function UsersScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.services')
        .service('Notifications', ['ServicesModel', function (ServicesModel) {
            angular.extend(this, ServicesModel.create('/api/notifications/?idUser=:idUser', null, {
                getNotificationsByUser: {
                    method: 'GET',
                    param: {
                        idUser: '@idUser'
                    },
                    isArray: true
                },
                updateNotifications: {
                    method: 'PUT'
                }
            }));
        }]);
})(window.angular);