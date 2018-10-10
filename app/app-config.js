(function rootConfigScope(angular) {
    'use strict';
    var env = {};

    // Import variables if present (from env.js)
    if (window) {
        Object.assign(env, window.__env);
    }

    angular.module('connectingUsCenter', [
        'ngRoute', 'ngAnimate', 'ngSanitize',
        'ngTouch', 'ui.router',
        'ui.bootstrap', 'angularSpinner',
        'connectingUsCenter.services',
        'connectingUsCenter.directives',
        'connectingUsCenter.login',
        'connectingUsCenter.myAccount',
        'connectingUsCenter.usersOffers',
        'pascalprecht.translate'
    ])
        .config(['$stateProvider', '$locationProvider', '$routeProvider', '$translateProvider','$logProvider','__env',
            function config($stateProvider, $locationProvider, $routeProvider, $translateProvider,$logProvider,__env) {
                angular.lowercase = angular.$$lowercase;
                
                $logProvider.debugEnabled(__env.enableDebug);
                
                //Translations
                var translationsEN = {
                    "global": {
                        "button": {
                            "save": "Save",
                            "cancel": "Cancel"
                        },
                        "gender": {
                            "male": "Male",
                            "female": "Female",
                            "other": "Other"
                        },
                        "error": {
                            "textRequired": "This field is required"
                        }
                    },
                    "login": {

                    },
                    "myAccount": {
                        "titleSignUp": "Registration",
                        "general": {
                            "title": "General",
                            "firstName": "First name",
                            "lastName": "Last name",
                            "nickName": "Nick name",
                            "dayOfBirth": "Day of birth",
                            "gender": "Gender",
                            "nationality": "Nationality",
                            "country": "Country of residence",
                            "city": "City"
                        },
                        "account": {
                            "title": "Account",
                            "email": "Email",
                            "emailConfirm": "Confirm email",
                            "password": "Password",
                            "passwordConfirm": "Confirm Password",
                            "codeArea": "Code of Area",
                            "phoneNumber": "Phone Number",
                            "typeNumber": "Type"
                        },
                        "error": {
                            "emailConfirm": "The emails must be equals",
                            "passwordConfirm": "The passwords are not equals",
                            "email": "Set an valid email",
                            "password": "The password must have at least eight characters."
                        }


                    },
                    "offers": {
                        "title": "Services Offers",
                        "searchItem": "Search",
                        "filter": {
                            "title": "Filter by:",
                            "type": "Type",
                            "location": "Location",
                            "clearAll": "Clear All"
                        }
                    }
                };

                $translateProvider.translations('en', translationsEN);

                $translateProvider.fallbackLanguage('en');
                $translateProvider.preferredLanguage('en');

                $stateProvider.state('myAccount', {
                    url: '/myAccount',
                    templateUrl: 'modules/myAccount/templates/myAccount-crud.html'
                });
                $stateProvider.state('users-offers', {
                    url: '/offers',
                    templateUrl: 'modules/users-offers/templates/users-offers.html'
                });

                $locationProvider.hashPrefix('');

                $routeProvider.otherwise({
                    redirectTo: '/login'
                });


            }
        ])
        .constant('__env', env);
})(angular);