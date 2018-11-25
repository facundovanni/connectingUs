(function OffersCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.offers')
        .controller('OffersController', ['Offers', '$rootScope', '$state', 'Countries', 'Cities', 'Categories', 'isMyOwn', 'toastr', '$translate',
            function (Offers, $rootScope, $state, Countries, Cities, Categories, isMyOwn, toastr, $translate) {
                var ctrl = this;

                ctrl.offers = [];
                ctrl.categories = [];
                ctrl.filters = {};
                ctrl.countries = [];
                ctrl.cities = [];
                ctrl.categoriesSelected = [];
                ctrl.myOffers = isMyOwn;
                ctrl.pagination = {
                    limits: [10, 25, 50, 100],
                    pageIndex: 1,
                    itemsPerPage: 10
                };
                ctrl.init = function init() {
                    //get the Offers
                    ctrl.checkLog();
                    ctrl.getCategories();
                    ctrl.getCountries();
                    ctrl.updateOffers();
                };

                ctrl.checkLog = function checkLog() {
                    if (!$rootScope.auth.isLoggedIn()) {
                        $state.go('/login');
                    }
                };

                ctrl.getCategories = function getCategories() {
                    ctrl.isLoadingCategories = true;
                    ctrl.isFullyLoaded();
                    Categories.getAll().$promise
                        .then(ctrl.setCategories)
                        .catch(ctrl.onCatchAccount)
                        .finally(ctrl.onFinallyCategories);
                };

                ctrl.setCategories = function setCategories(result) {
                    ctrl.categories = result;
                };

                ctrl.onFinallyCategories = function onFinallyCategories() {
                    ctrl.isLoadingCategories = false;
                    ctrl.isFullyLoaded();
                };

                ctrl.updateOffers = function updateOffers() {
                    ctrl.isLoadingOffers = true;
                    ctrl.isFullyLoaded();
                    ctrl.setFilters();
                    Offers.getAll(ctrl.filters).$promise.then(function onThen(result) {
                        ctrl.offers.splice.apply(ctrl.offers, [0, ctrl.offers.length].concat(result.Services));
                        ctrl.totalItems = result.TotalServices ? result.TotalServices : 1;
                        ctrl.pagination.totalPages = Math.ceil(ctrl.totalItems / ctrl.pagination.itemsPerPage);
                    }).finally(function onFinally() {
                        ctrl.isLoadingOffers = false;
                        ctrl.isFullyLoaded();
                    });
                };

                ctrl.setFilters = function setFilters() {
                    var filterSelectedCategories = [];
                    filterSelectedCategories = ctrl.categories.filter(function fil(category) {
                        return category.selected;
                    })
                    ctrl.filters.Categories = filterSelectedCategories.length ? filterSelectedCategories : undefined;
                    ctrl.filters.IdCountry = ctrl.filterCountry ? ctrl.filterCountry.Id : undefined;
                    ctrl.filters.IdCity = ctrl.filterCity ? ctrl.filterCity.Id : undefined;
                    ctrl.filters.Active = !ctrl.myOffers ? undefined : !ctrl.showInactives;
                    ctrl.filters.IdUser = $rootScope.session.getUserId();
                    ctrl.filters.Text = ctrl.searchText ? ctrl.searchText : undefined;
                    ctrl.filters.NumberOfPage = ctrl.pagination.pageIndex;
                    ctrl.filters.NumberOfRows = ctrl.pagination.itemsPerPage;
                };

                ctrl.search = function search() {
                    ctrl.updateOffers();
                }

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
                    Cities.getAll({ idCountry: ctrl.filterCountry.Id }).$promise
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
                };

                ctrl.onSelectCountry = function onSelectCountry() {
                    ctrl.getCities();
                };

                ctrl.clearAllFilters = function clearAllFilters() {
                    ctrl.filter = {};
                    ctrl.categories.forEach(function each(cat) {
                        cat.selected = false;
                    });
                    ctrl.filterCountry = undefined;
                    ctrl.filterCity = undefined;
                    ctrl.showInactives = ctrl.myOffers ? false : false;
                    ctrl.searchText = undefined;

                    ctrl.updateOffers();
                };

                ctrl.pagePrev = function pagePrev() {
                    if (ctrl.pagination.pageIndex > 1) {
                        ctrl.pagination.pageIndex--;
                        ctrl.updateOffers();
                    }
                };

                ctrl.pageNext = function pageNext() {
                    if (!(ctrl.pagination.pageIndex + 1 > ctrl.pagination.totalPages)) {
                        ctrl.pagination.pageIndex++;
                        ctrl.updateOffers();
                    }
                };

                ctrl.pageSpecific = function pageSpecific() {
                    var isPageInRange = !(ctrl.pagination.pageSelected > ctrl.pagination.totalPages);
                    var isPageAvailable = (1 <= ctrl.pagination.pageSelected) && isPageInRange;

                    if (isPageAvailable) {
                        ctrl.pagination.pageIndex = ctrl.pagination.pageSelected;
                        ctrl.updateOffers();
                    } else {
                        toastr.error($translate.instant('offers.pageSelectedError'));
                    }
                };

                ctrl.init();
            }

        ]);
})(angular);