(function MateriaConfigScope(angular) {
    'use strict';

    // tag::module[]
    angular.module('connectingUsCenter.offers', ['ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/offers', {
                url:'/offers',
                controller: 'OffersController as ctrl',
                templateUrl: 'modules/offers/templates/offers.html',
                resolve: {
                    isMyOwn: function isMyOwn() {
                        return false;
                    }
                }
            })
            $routeProvider.when('/my-offers', {
                templateUrl: 'modules/offers/templates/offers.html',
                controller: 'OffersController as ctrl',
                resolve: {
                    isMyOwn: function isMyOwn() {
                        return true;
                    }
                }
            });
            $routeProvider.when('/my-offers/:id', {
                templateUrl: 'modules/offers/templates/offers-crud.html',
                controller: 'OffersCRUDController as ctrl',
                resolve: {
                    isMyOwn: function isMyOwn() {
                        return true;
                    }
                }
            });
            $routeProvider.when('/offers/:id', {
                templateUrl: 'modules/offers/templates/offers-crud.html',
                controller: 'OffersCRUDController as ctrl',
                resolve: {
                    isMyOwn: function isMyOwn() {
                        return true;
                    }
                }
            });
        }]);
        
})(angular);