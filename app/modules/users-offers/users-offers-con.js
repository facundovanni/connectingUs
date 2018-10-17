(function UsersOffersCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.usersOffers')
        .controller('UsersOffersController', ['$scope', 'UsersOffers', '$translate', '$state',
            function ($scope, UsersOffers, $translate, $state) {
                var ctrl = this;

                ctrl.offers = [];
                ctrl.categories = [];
                ctrl.categoriesSelected = [];
                ctrl.filters = {};

                ctrl.offers.push({
                    title: 'Título',
                    description: 'Esto es una descripción',
                    city: 'city'
                });

                //init function --> Get All the Offers || Get the currencySymbol of the PriceList || Fill the filters
                ctrl.init = function init() {
                    //get the Offers
                    ctrl.getCategories();
                    //ctrl.updateOffers();
                };

                ctrl.getCategories = function getCategories() {
                    ctrl.isLoadingCategories = true;
                    ctrl.categories.push({ id: 1, description: 'Lodging' });
                    ctrl.categories.push({ id: 1, description: 'Tour Guide' });
                    ctrl.categories.push({ id: 1, description: 'Advices' });
                    ctrl.isLoadingCategories = false;
                };

                ctrl.updateOffers = function updateOffers() {
                    ctrl.isLoadingOffers = true;
                    ctrl.isFullyLoaded();

                    ctrl.setFilters();
                    
                    UsersOffers.get(ctrl.filters).$promise.then(function onThen(offers) {
                        ctrl.offers = offers;

                    }).finally(function onFinally() {
                        ctrl.isLoadingOffers = false;
                        ctrl.isFullyLoaded();
                    });
                };

                ctrl.setFilters = function setFilters(){
                    if(ctrl.categoriesSelected.length){
                        ctrl.filters.categories = ctrl.categoriesSelected;
                    }
                };

                ctrl.isFullyLoaded = function isFullyLoaded() {
                    ctrl.isLoading = ctrl.isLoadingCategories || ctrl.isLoadingOffers;
                };

                ctrl.init();
            }
        ]);
})(angular);