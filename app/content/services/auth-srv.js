(function AuthService(angular) {
    'use strict';
    // Export
    angular
        .module('connectingUsCenter.services')
        .service('auth', ['$http', 'session','__env', function auth($http, session,__env) {
            var that = this;
            /**
             * Check whether the user is logged in
             * @returns boolean
             */
            that.isLoggedIn = function isLoggedIn() {
                return session.getUser() !== null;
            };

            /**
             * Log in
             *
             * @param credentials
             * @returns {*|Promise}
             */
            that.logIn = function (credentials) {
                return $http
                    .post(__env.apiUrl+'/api/login', credentials)
                    .then(function (response) {
                        session.setUser(response.data);
                        session.setAccessToken(1);
                    });
            };

            /**
             * Log out
             *
             * @returns {*|Promise}
             */
            that.logOut = function () {
                // return $http
                //     .get(__env.apiUrl+'/api/logout')
                //     .then(function (response) {

                //         Destroy session in the browser
                //         session.destroy();
                //     });
                    session.destroy();
            };

        }]);
})(angular);