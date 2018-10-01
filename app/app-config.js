angular.module('connectingUsCenter', [
    'ngRoute', 'ngAnimate', 'ngSanitize',
    'ngTouch', 'ui.grid', 'ui.router',
    'ui.bootstrap', 'angularSpinner', 'angularjs-dropdown-multiselect',
    'connectingUsCenter.services',
    'connectingUsCenter.login',
    'connectingUsCenter.myAccount',
    'pascalprecht.translate'
])
    .config(['$stateProvider', '$locationProvider', '$routeProvider', '$translateProvider',
        function config($stateProvider, $locationProvider, $routeProvider, $translateProvider) {
            angular.lowercase = angular.$$lowercase;
            //Translations
            var translationsEN = {
                "global":{
                    "button":{
                        "save":"Save",
                        "cancel":"Cancel"
                    },
                    "gender":{
                        "male":"Male",
                        "female":"Female",
                        "other":"Other"
                    }
                },
                "myAccount":{
                    "titleSignUp":"Registration",
                    "general":{
                        "title":"General",
                        "firstName": "First name",
                        "lastName": "Last name",
                        "nickName": "Nick name",
                        "dayOfBirth": "Day of birth",
                        "gender": "Gender",
                        "nationality":"Nationality",
                        "country": "Country",
                        "city": "City"
                    },
                    "account":{
                        "title":"Account",
                        "email":"Email",
                        "emailConfirm":"Confirm email",
                        "password":"Password",
                        "passwordConfirm": "Confirm Password",
                        "codeArea":"Code of Area",
                        "phoneNumber":"Phone Number",
                        "typeNumber":"Type"
                    }
                    
                    
                }
            };

            $translateProvider.translations('en', translationsEN);

            $translateProvider.fallbackLanguage('en');
            $translateProvider.preferredLanguage('en');


            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'modules/login/login.html'
            });
            $stateProvider.state('myAccount', {
                url: '/myAccount',
                templateUrl: 'modules/myAccount/myAccount-crud.html'
            });

            $locationProvider.hashPrefix('');

            $routeProvider.otherwise({ redirectTo: '/login' });


        }])