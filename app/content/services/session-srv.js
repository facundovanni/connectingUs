(function (angular) {
    'use strict';

    angular.module('connectingUsCenter.services')
        .service('session', ['$log', 'localStorage', function session($log, localStorage) {
            var that = this;
            // Instantiate data when service
            // is loaded
            that._user = JSON.parse(localStorage.getItem('session.user'));
            that._accessToken = JSON.parse(localStorage.getItem('session.accessToken'));

            that.getUser = function () {
                return that._user;
            };
            
            that.getUserId = function getUserId() {
                return that._user.Id;
            };

            that.setUser = function (user) {
                that._user = user;
                localStorage.setItem('session.user', JSON.stringify(user));
                return that;
            };

            that.getAccessToken = function () {
                return that._accessToken;
            };

            that.setAccessToken = function (token) {
                that._accessToken = token;
                localStorage.setItem('session.accessToken', token);
                return that;
            };

            /**
             * Destroy session
             */
            that.destroy = function destroy() {
                that.setUser(null);
                that.setAccessToken(null);
            };

        }]);

})(angular);