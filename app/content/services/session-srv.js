(function (angular) {
    'use strict';

    angular.module('connectingUsCenter.services')
        .service('session', ['$log', 'localStorage', '$cookies', function session($log, localStorage, $cookies) {
            var that = this;
            // Instantiate data when service
            // is loaded
            that._user = JSON.parse(localStorage.getItem('session.user'));
            that._accessToken = localStorage.getItem('session.accessToken');

            that.getUser = function () {
                return that._user;
            };

            that.getUserNickName = function getUserNickName() {
                return that._user ? that._user.NickName : undefined;
            };

            that.getUserId = function getUserId() {
                return that._user ? that._user.Id : undefined;
            };

            that.setUser = function (user) {
                that._user = user;
                localStorage.setItem('session.user', JSON.stringify(user));
            };

            that.getAccessToken = function () {
                return that._accessToken;
            };

            that.setAccessToken = function (token) {
                that._accessToken = token;
                $cookies.putObject('token', that._accessToken);
            };

            /**
             * Destroy session
             */
            that.destroy = function destroy() {
                localStorage.removeItem('session.user');
                $cookies.remove('token');
                that._user = undefined;
                that._accessToken = undefined;
            };
        }]);

})(angular);