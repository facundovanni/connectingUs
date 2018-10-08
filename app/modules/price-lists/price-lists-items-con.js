(function PriceListsItemsScope(application) {
    'use strict';
    application.app.lazy.controller('PriceListsItemsController', ['$state', '$scope', 'PriceListsItems', 'PriceLists', 'SambaCompanySettings', 'PriceListsItemsFilters', '$translate', 'BluemoonNavigator', '$rootScope', 'priceListsItemsSort', 'client',
        function PriceListsItemsController($state, $scope, PriceListsItems, PriceLists, SambaCompanySettings, PriceListsItemsFilters, $translate, BluemoonNavigator, $rootScope, priceListsItemsSort, client) {
            var that = this;
            that.priceListItems = {};
            that.priceListsItemsFilters = {};
            that.currencySymbol = '';
            that.productClasses = [];
            that.classification1 = [];
            that.classification2 = [];
            that.pagination = {
                itemsPerPage: 25,
                pageIndex: 1,
                totalItems: undefined
            };
            that.filters = {
                useOr: false,
                items: []
            };
            that.selectedClassification1 = '';
            that.selectedClassification2 = '';
            that.selectedProductClasses = '';

            //init function --> Get All the PriceListItems || Get the currencySymbol of the PriceList || Fill the filters
            that.init = function init() {
                //get the PriceListItems
                that.getNameFilters();
                that.updatePriceListItems();
                that.updatePriceListItemsFilters();
                that.getCurrencySymbol();
                BluemoonNavigator.setSafeNavigationAway(true);
            };

            that.getNameFilters = function getNameFilters() {
                SambaCompanySettings.get().$promise.then(function currencySymbol(company) {
                    that.classification1FilterName = company.classification1;
                    that.classification2FilterName = company.classification2;
                });
            };

            //Get All the Items. Get the options to the filters
            that.updatePriceListItems = function updatePriceListItems() {
                var filter = JSON.stringify(that.filters);
                that.isItemsLoading = true;
                that.isFullyLoaded();
                client().then(function client(res) {
                    that.clientId = res.ContactId;
                    that.priceListItems = PriceListsItems.get({
                        filter: filter,
                        itemsPerPage: that.pagination.itemsPerPage,
                        pageIndex: that.pagination.pageIndex,
                        orderBy: that.getSort()
                    });

                    return that.priceListItems.$promise.then(function Items() {
                        that.fillPagination();
                    }).finally(function onFinally() {
                        that.isItemsLoading = false;
                        that.isFullyLoaded();
                    });
                });
            };

            that.getCurrencySymbol = function getCurrencySymbol() {
                //get the currency symbol of the pricelist in use
                PriceLists.query().$promise.then(function currencySymbol(pricelists) {
                    that.currencySymbol = pricelists[0].currencySymbol;
                });
            };

            //Get All the Items. Get the options to the filters
            that.updatePriceListItemsFilters = function updatePriceListItemsFilters() {
                that.isFiltersLoading = true;
                that.isFullyLoaded();
                that.priceListsItemsFilters = PriceListsItemsFilters.get({
                    productClass: that.selectedProductClasses,
                    classification1Name: that.selectedClassification1,
                    classification2Name: that.selectedClassification2
                });

                that.priceListsItemsFilters.$promise.then(function Items() {
                    that.fillFilter();
                }).finally(function onFinally() {
                    that.isFiltersLoading = false;
                    that.isFullyLoaded();
                });
            };
            that.fillFilter = function fillFilter() {
                that.replaceArrayContent(that.productClasses, that.priceListsItemsFilters.productClassList);
                that.replaceArrayContent(that.classification1, that.priceListsItemsFilters.classification1NameList);
                that.replaceArrayContent(that.classification2, that.priceListsItemsFilters.classification2NameList);
            };

            that.fillPagination = function fillPagination() {
                that.pagination.itemsPerPage = that.priceListItems.itemsPerPage;
                that.pagination.pageIndex = that.priceListItems.pageIndex;
                that.pagination.totalItems = that.priceListItems.totalItems;
            };

            that.onClassification1Change = function onClassification1Change(classification1) {
                //set the filters and update view
                that.setFilters({
                    classification1: classification1
                });
                that.selectedClassification1 = classification1;
                that.pagination.pageIndex = 1;
                that.updatePriceListItemsFilters();
                that.updatePriceListItems();
            };

            that.onClassification2Change = function onClassification2Change(classification2) {
                //set the filters and update view
                that.setFilters({
                    classification2: classification2
                });
                that.selectedClassification2 = classification2;
                that.pagination.pageIndex = 1;
                that.updatePriceListItemsFilters();
                that.updatePriceListItems();
            };

            that.onProductClassChange = function onClassChange(productClass) {
                //set the filters and update view
                that.setFilters({
                    productClass: productClass
                });
                that.selectedProductClasses = productClass;
                that.pagination.pageIndex = 1;
                that.updatePriceListItemsFilters();
                that.updatePriceListItems();
            };

            that.setFilters = function setFilters(params) {
                that.filters.useOr = false;
                if (params.classification1) {
                    that.setFilter({
                        by: 'product.classification1Name',
                        op: 'EQ',
                        value: params.classification1
                    });
                }
                if (params.classification2) {
                    that.setFilter({
                        by: 'product.classification2Name',
                        op: 'EQ',
                        value: params.classification2
                    });
                }
                if (params.productClass) {
                    that.setFilter({
                        by: 'product.productClass',
                        op: 'EQ',
                        value: params.productClass
                    });
                }
            };

            that.setFilter = function setFilter(filter) {
                that.removeFilter(filter);
                that.filters.items.push(filter);
            };

            that.removeFilter = function removeFilter(filter) {

                var newFilters = that.filters.items.filter(function find(fil) {
                    if (fil.by === 'price') {
                        if (fil.op !== filter.op) {
                            return fil;
                        }
                    } else {
                        return fil.by !== filter.by;
                    }
                });
                that.replaceArrayContent(that.filters.items, newFilters);

            };

            that.removeFilters = function removeFilters() {
                that.filters.items.splice(0);
            };

            that.clearAllFilters = function clearAllFilters() {
                that.clearCombos();
                that.clearSearchBar();
                that.removeFilters();
                that.updatePriceListItemsFilters();
                that.updatePriceListItems();
            };

            that.clearCombos = function clearCombos() {
                that.selectedClassification1 = '';
                that.selectedClassification2 = '';
                that.selectedProductClasses = '';
                that.priceFrom = undefined;
                that.priceTo = undefined;
                that.priceFilterError = '';
                that.pagination.pageIndex = 1;
            };

            that.clearSearchBar = function clearSearchBar() {
                that.searchText = null;
            };

            that.replaceArrayContent = function replaceArrayContent(target, source) {
                target.splice.apply(target, [0, target.length].concat(source));
            };

            that.onPageChange = function onPageChange(page) {
                if (that.priceListItems.pageIndex !== page && page !== undefined) {
                    that.updatePriceListItems().then(function onThen() {
                        $rootScope.$emit('main-scroll-top');
                    });
                }
            };

            that.onPageSizeChange = function onPageChange(size) {
                if (that.priceListItems.itemsPerPage !== size && size !== undefined) {
                    that.updatePriceListItems();
                }
            };
            that.search = function search(text) {
                if (text.length !== 0) {
                    //set the filters and update view
                    that.setFilter({
                        by: 'product.searchDescription',
                        op: 'LIKE',
                        value: text.toUpperCase()
                    });
                    that.updatePriceListItems();
                } else {
                    that.clearAllFilters();
                }
            };
            that.priceApply = function priceApply() {
                that.priceFilterError = '';
                if (that.priceFrom >= 0 && that.priceFrom !== null) {
                    if (that.priceTo < that.priceFrom) {
                        $scope.$emit('alert-error', $translate.instant('message.general.error'), 0);
                        that.priceFilterError = 'PriceLists.inputPriceFilterValidation';
                    } else {
                        //set the filters and update view
                        that.setFilter({
                            by: 'price',
                            op: 'GE',
                            value: that.priceFrom
                        });
                    }
                } else {
                    that.removeFilter({ by: 'price', op: 'GE', value: null }); //Maybe it was cleaned, so i have to remove.
                }
                if (that.priceTo >= 0 && that.priceTo !== null) {
                    if (that.priceTo < that.priceFrom) {
                        $scope.$emit('alert-error', $translate.instant('message.general.error'), 0);
                        that.priceFilterError = 'PriceLists.inputPriceFilterValidation';
                    } else {
                        //set the filters and update view
                        that.setFilter({
                            by: 'price',
                            op: 'LE',
                            value: that.priceTo
                        });
                    }
                } else {
                    that.removeFilter({ by: 'price', op: 'LE', value: null }); //Maybe it was cleaned, so i have to remove.
                }
                if ((that.priceFrom >= 0 || that.priceTo >= 0) && that.priceFilterError === '') {
                    that.pagination.pageIndex = 1;
                    that.updatePriceListItems();
                }
            };

            that.isFullyLoaded = function isFullyLoaded() {
                that.isLoading = (that.isFiltersLoading || that.isItemsLoading);
            };

            that.sortingOptions = priceListsItemsSort.sortingOptions;
            that.getSort = function getSort() {
                that.sortingSelected = priceListsItemsSort.getSort(that.clientId);
                for(var op in that.sortingOptions) {
                    if (that.sortingSelected === that.sortingOptions[op]) {
                        var result;
                        switch (op) {
                            case '0': result = 'price asc'; break;
                            case '1': result = 'price desc'; break;
                            case '2': result = 'relevance desc'; break;
                        }
                        return result;
                    }
                }
            };

            that.changeSorting = function changeSorting(choice) {
                that.sortingSelected = choice;
                priceListsItemsSort.setSort(that.clientId, that.sortingSelected);
                that.updatePriceListItems();
            };

            that.init();

        }]);
})(window.application);
