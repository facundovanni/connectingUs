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
        'ngRoute', 'ngAnimate', 'toastr', 'angularMoment', 'angular-simple-chat', 'ngSanitize',
        'ngTouch', 'ui.router',
        'ui.bootstrap', 'angularSpinner',
        'connectingUsCenter.services',
        'connectingUsCenter.directives',
        'connectingUsCenter.login',
        'connectingUsCenter.about',
        'connectingUsCenter.myAccount',
        'connectingUsCenter.offers',
        'connectingUsCenter.chats',
        'pascalprecht.translate',
        'ngResource', 'ngFileUpload', 'naif.base64'
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
                        },
                        "menu": {
                            "myAccount": "My Account",
                            "myOffers": "My Offers",
                            "myChats": "My Chats",
                            "offers": "Users Offers"
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
                        "text.p1": "We are a group of young people with the aim of connecting tourists or groups of of tourist with locals from different countries who can offer a service. Our idea is to create the link between them so they can decide what type of of service they can offer and publish the offer in a webpage. The offers can be varied: from advise  to eating in quality places with good prices to providing accomodation.",
                        "text.p2": "This page doesn't ask for payments and we consider that the best retribution is the cultural exchange, although the details are up to the users of the web page.",
                        "text.p3": "We want to change the way we travel and we want you to join us.",
                        "text.p4": "This project was born In the frame of the Diller Teen Fellows international training program as a way to put into action all the tools and abilities we have learnt.",
                        "contact": "Contact Us"
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
                            "image": {
                                "accept": "The file must be '.jpeg', .jpg' or '.png'",
                                "size": "The file must be smaller than 1MB",
                                "general": "The file must be '.jpeg', .jpg' or '.png' and smaller than 1MB"
                            }
                        },
                        "selectImg": "Select Image (Max. 1MB)"
                    },
                    "chats": {
                        "title": "Chats",
                        "others": "About offers",
                        "my": "About my offers",
                        "last": "Last message: ",
                        "byServices": "About service",
                        "message": {
                            "sendOk": "Message sended!",
                            "sendError": "An Error has ocurred"
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

                $stateProvider.state('/my-offers', {
                    url: '/my-offers'
                });

                $stateProvider.state('/offers/:Id', {
                    url: '/offers/:Id'
                });
                $stateProvider.state('/my-offers/:Id', {
                    url: '/my-offers/:Id'
                });

                $stateProvider.state('/chats', {
                    url: '/chats',
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