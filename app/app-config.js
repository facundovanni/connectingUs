(function rootConfigScope(angular) {
    'use strict';
    var env = {};

    // Import variables if present (from env.js)
    if (window) {
        Object.assign(env, window.__env);
    }

    function assignServicesToRootScope($rootScope, auth, session) {
        $rootScope.auth = auth;
        $rootScope.session = session;
    }
    assignServicesToRootScope.$inject = ['$rootScope', 'auth', 'session'];

    angular.module('connectingUsCenter', [
            'ngRoute', 'ngAnimate', 'toastr', 'ngSanitize',
            'ngTouch', 'ui.router',
            'ui.bootstrap', 'angularSpinner',
            'connectingUsCenter.services',
            'connectingUsCenter.directives',
            'connectingUsCenter.login',
            'connectingUsCenter.about',
            'connectingUsCenter.myAccount',
            'connectingUsCenter.offers',
            'pascalprecht.translate',
            'ngResource'
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
                            "cancel": "Cancel",
                            "termsAndConditions": "I read and accept the terms and Conditions",
                            "comeBack": "Come Back"
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
                        "phoneType": {
                            "mobile": "Mobile",
                            "home": "Home",
                            "other": "Other"
                        }
                    },
                    "login": {
                        "welcome": "Welcome to Connecting Us",
                        "email": "Email",
                        "password": "Password",
                        "signIn": "Sign In",
                        "signOut": "Log Out",
                        "signUp": "Not registered yet? Sign Up!",
                        "error": "The email or password are wrong"
                    },
                    "about": {
                        "title": "About us",
                        "whereAreWe": "Where do we have services right now?",
                        "text":"We are a group of young people whose goal is to unite two or more people, in a relationship involving tourists and individuals who can provide a service. Our idea is to create the connecting link between both parties and that they can decide which service they will exchange by uploading it to the page. They can vary from advice as to where you can go for dinner at a good price or good quality or even provide a hosting service. This page does not have payment services and we consider that the best remuneration is a cultural exchange, although this decision is in the hands of those who decide to use this page. We want to revolutionize the way we travel today. Join this change. This project was born within the international training program Diller Teen Fellows as a final project to encompass everything learned in it and we appreciate the tools that made it possible to carry out our ideal.",
                        "contact":"Contact Us"
                    },
                    "myAccount": {
                        "title": "My Account",
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
                            "email": "Set an valid email. The email must have a '@' and a '.'",
                            "password": "The password must have at least eight characters.",
                            "termsAndConditions": "You must accept terms and conditions",
                            "phoneNumber": "Set a valid number. Only numbers and -"
                        }
                    },
                    "offers": {
                        "title": {
                            "users": "Services Offers",
                            "my": "My Services Offers"
                        },
                        "addNew": "Add new",
                        "searchItem": "Search",
                        "filter": {
                            "title": "Filter by:",
                            "type": "Type",
                            "location": "Location",
                            "inactives": "Inactives",
                            "inactivesOptions": "Show Inactives",
                            "clearAll": "Clear All",
                            "applyFilter": "Apply Filter"
                        },
                        "city": "City",
                        "country": "Country",
                        "category": "Category",
                    },
                    "myOffer": {
                        "titleView": "Offer Details",
                        "title": "Title",
                        "category": "Category",
                        "country": "Country",
                        "city": "City",
                        "description": "Description",
                        "updateService": "Save Service",
                        "cancelUpdate": "Cancel",
                        "active": "Disable service",
                        "startConversation": "Start conversation",
                        "error": {
                            "title": "The title is required",
                            "category": "The category is required",
                            "country": "The country is required",
                            "city": "The city is required",
                            "description": "The description is required",
                            "status": "The status is required",
                        }


                    }
                };

                $translateProvider.translations('en', translationsEN);

                $translateProvider.fallbackLanguage('en');
                $translateProvider.preferredLanguage('en');

                $stateProvider.state('/login', {
                    url: '/login'
                });
                $stateProvider.state('/about', {
                    url: '/about'
                });
                $stateProvider.state('/account', {
                    url: '/account',
                    params: {
                        Id: null
                    }
                });

                $stateProvider.state('/offers', {
                    url: '/offers'
                });
                $stateProvider.state('/myOffer', {
                    url: '/myOffer',
                    templateUrl: 'modules/myOffer/templates/myOffer.html'
                });

                $stateProvider.state('/my-offers', {
                    url: '/my-offers'
                });

                $stateProvider.state('/offers/:Id', {
                    url: '/offers/:Id'
                });
                $stateProvider.state('/my-offers/:Id', {
                    url: '/my-offers/:Id'
                });

                $locationProvider.hashPrefix('');

                $urlRouterProvider.otherwise(function ($injector, $location) {
                    var $state = $injector.get('$state');
                    $state.go('/login');
                });


            }
        ])
        .constant('__env', env)
        .run(assignServicesToRootScope);
})(angular);