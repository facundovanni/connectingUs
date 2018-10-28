(function UsersOffersCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.usersOffers')
        .controller('UsersOffersController', ['$scope', 'UsersOffers', '$translate', '$state', 'Countries', 'Cities',
            function ($scope, UsersOffers, $translate, $state, Countries, Cities) {
                var ctrl = this;

                ctrl.offers = [];
                ctrl.categories = [];
                ctrl.filters = {};
                ctrl.countries = [];
                ctrl.cities = [];
                ctrl.categoriesSelected = [];
                // ctrl.offers.push({
                //     Title: 'Título',
                //     Description: 'Esto es una descripción',
                //     Category: { Name: 'Category' },
                //     CountryOfResidence: { Name: 'Country' },
                //     CityOfResidence: { Name: 'City' }
                // });

                //init function --> Get All the Offers || Get the currencySymbol of the PriceList || Fill the filters
                ctrl.init = function init() {
                    //get the Offers
                    ctrl.getCategories();
                    ctrl.getCountries();
                    ctrl.updateOffers();
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

                    UsersOffers.get().$promise.then(function onThen(result) {
                        ctrl.offers.splice.apply(ctrl.offers, [0, ctrl.offers.length].concat(result));

                    }).finally(function onFinally() {
                        ctrl.isLoadingOffers = false;
                        ctrl.isFullyLoaded();
                    });
                };

                ctrl.setFilters = function setFilters() {
                    if (ctrl.categoriesSelected.length) {
                        ctrl.filters.categories = ctrl.categoriesSelected;
                    }
                };

                ctrl.isFullyLoaded = function isFullyLoaded() {
                    ctrl.isLoading = ctrl.isLoadingCategories || ctrl.isLoadingCountries || ctrl.isLoadingOffers || ctrl.isLoadingCities;
                };

                ctrl.getCountries = function getCountries() {
                    ctrl.isLoadingCountries;
                    ctrl.isFullyLoaded();
                    Countries.getAll().$promise
                        .then(ctrl.setCountries)
                        .catch(ctrl.onCatchAccount)
                        .finally(ctrl.onFinallyCountries);
                };

                ctrl.setCountries = function setCountries(result) {
                    ctrl.countries = result;
                };

                ctrl.onFinallyCountries = function onFinallyCountries() {
                    ctrl.isLoadingCountries = false;
                    ctrl.isFullyLoaded();
                };

                ctrl.getCities = function getCities() {
                    ctrl.isLoadingCities = true;
                    ctrl.isFullyLoaded();
                    Cities.getAll({ countryId: ctrl.filterCountry.Id }).$promise
                        .then(ctrl.setCities)
                        .catch(ctrl.onCatchAccount)
                        .finally(ctrl.onFinallyCities);
                };

                ctrl.setCities = function setCities(result) {
                    ctrl.cities = result;
                };

                ctrl.onFinallyCities = function onFinallyCities() {
                    ctrl.isLoadingCities = false;
                    ctrl.isFullyLoaded();
                    ctrl.cities.push({ id: 1, description: "Buenos Aires", code: "BSAS" });
                };

                ctrl.onSelectCountry = function onSelectCountry() {
                    ctrl.getCities();
                };

                ctrl.onChangeFilters = function onChangeFilter() {

                    ctrl.filters.categories = ctrl.categories.filter(function fil(category) {
                        return category.selected;
                    });
                    ctrl.filters.country = ctrl.filterCountry.id;
                    ctrl.filters.city = ctrl.filterCity.id;

                    //ctrl.updateOffers();
                };

                ctrl.clearAllFilters = function clearAllFilters() {
                    ctrl.filter = {};
                    ctrl.categories.forEach(function each(cat) {
                        cat.selected = false;
                    });
                    ctrl.filterCountry = undefined;
                    ctrl.filterCity = undefined;
                }

                ctrl.init();
            }

        ]);
})(angular);