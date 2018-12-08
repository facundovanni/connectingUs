(function AuthService(angular) {
    'use strict';
    // Export
    angular
        .module('connectingUsCenter.services')
        .service('auth', ['$http', 'session', '__env', function auth($http, session, __env) {
            var that = this;
            /**
             * Check whether the user is logged in
             * @returns boolean
             */
            that.isLoggedIn = function isLoggedIn() {
                return session.getUserId();
            };

            /**
             * Log in
             *
             * @param credentials
             * @returns {*|Promise}
             */
            that.logIn = function (credentials) {
                return $http
                    .post(__env.apiUrl + '/api/login/authenticate', credentials)
                    .then(function (response) {
                        session.setUser({ Id: response.data.User.Id, NickName: response.data.User.Account.Nickname });
                        session.setAccessToken(response.data.Token);
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.Token;
                        /*  */

                    });
            };

            /**
             * Log out
             *
             * @returns {*|Promise}
             */
            that.logOut = function () {
                session.destroy();
                $http.defaults.headers.common.Authorization = '';
            };

        }]);
})(angular);