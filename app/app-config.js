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
        'connectingUsCenter.myOffer',
        'pascalprecht.translate'
    ])
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$translateProvider', '$logProvider', '__env',
            function config($stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, $logProvider, __env) {
                angular.lowercase = angular.$$lowercase;

                $logProvider.debugEnabled(__env.enableDebug);

                //Translations
                var translationsEN = {
                    "global": {
                        "button": {
                            "save": "Save",
                            "cancel": "Cancel"
                        },
                        "message": {
                            "saveSuccess": "The data has been saved successfully",
                            "saveError": "An error has ocurred"
                        },
                        "gender": {
                            "male": "Male",
                            "female": "Female",
                            "other": "Other"
                        },
                        "error": {
                            "textRequired": "This field is required"
                        },
                        "phoneType":{
                            "mobile":"Mobile",
                            "home": "Home",
                            "other": "Other"
                        }
                    },
                    "login": {
                        "welcome": "Welcome to Connecting Us",
                        "email": "email",
                        "password":"password",
                        "signIn": "Sign In",
                        "signUp": "Not registered yet? Sign Up!"
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
                            "codeArea": "Area code",
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
                            "clearAll": "Clear All",
                            "applyFilter": "Apply Filter"
                        }
                    },
                    "myOffer": {
                        "title": "Offer Details"
                    }
                };

                $translateProvider.translations('en', translationsEN);

                $translateProvider.fallbackLanguage('en');
                $translateProvider.preferredLanguage('en');

                $stateProvider.state('/login', {
                    url: '/login',
                    templateUrl: 'modules/login/templates/login.html'
                });
                $stateProvider.state('/account', {
                    url: '/account',
                    templateUrl: 'modules/myAccount/templates/myAccount-crud.html'
                });
                $stateProvider.state('/users-offers', {
                    url: '/offers',
                    templateUrl: 'modules/users-offers/templates/users-offers.html'
                });
                $stateProvider.state('/myOffer', {
                    url: '/myOffer',
                    templateUrl: 'modules/myOffer/templates/myOffer.html'
                });

                $locationProvider.hashPrefix('');

                $urlRouterProvider.otherwise(function ($injector, $location) {
                    var $state = $injector.get('$state');
                    $state.go('/login');
                });


            }
        ])
        .constant('__env', env);
})(angular);