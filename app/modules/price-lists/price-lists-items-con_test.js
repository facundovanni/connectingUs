describe('Test - PriceListsItemsController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('app'));

    var scope, controller, PriceListsItems, $q, deferred, deferredClient, PriceLists, SambaCompanySettings, PriceListsItemsFilters, $translate, priceListsItemsSort,client;

    var mockPriceListItems = {
        items: [
            {
                id: '1',
                price: 200,
                discountPrice: 0,
                relevance: 10,
                product: {
                    name: 'Product1',
                    classification1Name: 'IND',
                    classification2Name: 'HOM',
                    productClass: 'class1'
                }
            }, {
                id: '2',
                price: 100,
                discountPrice: 50,
                relevance: 3,
                product: {
                    name: 'Product2',
                    classification1Name: 'VEST',
                    classification2Name: 'MUJ',
                    productClass: 'class2'
                }
            }, {
                id: '3',
                price: 300,
                relevance: 20,
                product: {
                    name: 'Product3',
                    classification1Name: 'IND',
                    classification2Name: 'HOM',
                    productClass: 'class1'
                }
            }
        ],
        pageIndex: 1,
        startIndex: 1,
        itemsPerPage: 10,
        totalItems: 2,
        totalPages: 1,
    };
    var mockPriceList = [{
        id: '1',
        currencySymbol: '$'
    }];
    var mockClassificationFilterName = {
        classification1: 'Class1',
        classification2: 'Class2'
    };
    var mockPriceListsItemsFilters = {
        productClassList: [
            'PCA',
            'PCB'
        ],
        classification1NameList: [
            'C1A',
            'C1B'
        ],
        classification2NameList: [
            'C2A',
            'C2B'
        ],
    };
    var mockClient = {
        ContactId: 'A1'
    };

    beforeEach(function be() {
        module(function m($provide) {
            $provide.service('client', function client() {
                return function get() {
                    deferredClient.resolve(mockClient);
                    return deferredClient.promise;
                };
            });
        });
    });
    beforeEach(inject(function (_$rootScope_, _$controller_, _PriceListsItems_, _$q_, _PriceLists_, _SambaCompanySettings_, _PriceListsItemsFilters_, _$translate_, _priceListsItemsSort_, _client_) {
        scope = _$rootScope_.$new();
        PriceListsItems = _PriceListsItems_;
        PriceLists = _PriceLists_;
        SambaCompanySettings = _SambaCompanySettings_;
        PriceListsItemsFilters = _PriceListsItemsFilters_;
        $translate = _$translate_;
        $q = _$q_;
        deferred = $q.defer();
        deferredClient = $q.defer();
        priceListsItemsSort = _priceListsItemsSort_;
        client = _client_;
        controller = _$controller_('PriceListsItemsController', {
            $scope: scope,
        });
    }));

    describe('Init function', function testController() {

        it('should Get All the PriceListItems and Get the currencySymbol of the PriceList', function onIt() {
            //Arrange
            spyOn(controller, 'getNameFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            spyOn(controller, 'updatePriceListItemsFilters').and.returnValue();
            spyOn(controller, 'getCurrencySymbol').and.returnValue();
            //Action
            controller.init();
            // Assert            
            expect(controller.getNameFilters).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.updatePriceListItemsFilters).toHaveBeenCalled();
            expect(controller.getCurrencySymbol).toHaveBeenCalled();
        });

    });

    describe('getNameFilters function', function testController() {

        it('should get the label names of the filters', function onIt() {
            //Arrange
            controller.classification1FilterName = '';
            controller.classification2FilterName = '';
            spyOn(SambaCompanySettings, 'get').and.callFake(function onFake() {
                deferred.resolve(mockClassificationFilterName);
                return { $promise: deferred.promise };
            });
            //Action
            controller.getNameFilters();
            scope.$apply();
            // Assert
            expect(SambaCompanySettings.get).toHaveBeenCalled();
            expect(controller.classification1FilterName).toEqual(mockClassificationFilterName.classification1);
            expect(controller.classification2FilterName).toEqual(mockClassificationFilterName.classification2);
        });
    });

    describe('updatePriceListItems function', function testController() {

        it('should Get All the Items', function onIt() {
            //Arrange
            controller.priceListItems = {};
            spyOn(PriceListsItems, 'get').and.callFake(function onFake() {
                deferred.resolve(mockPriceListItems);
                return { $promise: deferred.promise };
            });
            spyOn(controller, 'isFullyLoaded').and.returnValue(true);
            spyOn(controller, 'getSort').and.returnValue('sort');
            //Action
            controller.updatePriceListItems();
            controller.isItemsLoading = true;
            scope.$apply();
            // Assert
            expect(PriceListsItems.get).toHaveBeenCalled();
            expect(controller.priceListItems.$promise).toBeDefined();
            expect(controller.isItemsLoading).toBe(false);
            expect(controller.isFullyLoaded).toHaveBeenCalled();
            expect(controller.getSort).toHaveBeenCalled();
        });

    });

    describe('getCurrencySymbol function', function testController() {

        it('should get the currency symbol of the pricelist in use', function onIt() {
            //Arrange
            controller.currencySymbol = '';
            spyOn(PriceLists, 'query').and.callFake(function onFake() {
                deferred.resolve(mockPriceList);
                return { $promise: deferred.promise };
            });
            //Action
            controller.getCurrencySymbol();
            scope.$apply();
            // Assert
            expect(PriceLists.query).toHaveBeenCalled();
            expect(controller.currencySymbol).toEqual('$');
        });

    });

    describe('updatePriceListItemsFilters function', function testController() {

        it('should Get All the options to the Filters', function onIt() {
            //Arrange
            controller.priceListItemsFilters = {};
            spyOn(PriceListsItemsFilters, 'get').and.callFake(function onFake() {
                deferred.resolve(mockPriceListsItemsFilters);
                return {
                    $promise: deferred.promise
                };
            });
            spyOn(controller, 'isFullyLoaded').and.returnValue(true);
            spyOn(controller, 'fillFilter');
            //Action
            controller.updatePriceListItemsFilters();
            controller.isFiltersLoading = true;
            scope.$apply();
            // Assert
            expect(PriceListsItemsFilters.get).toHaveBeenCalled();
            expect(controller.fillFilter).toHaveBeenCalled();
            expect(controller.priceListsItemsFilters.$promise).toBeDefined();
            expect(controller.isFiltersLoading).toBe(false);
            expect(controller.isFullyLoaded).toHaveBeenCalled();
        });

    });

    describe('fillFilter function', function testController() {

        it('should change classification1 array', function onIt() {
            //Arrange
            controller.classification1 = [];
            spyOn(controller, 'replaceArrayContent').and.returnValue(mockPriceListsItemsFilters.classification1NameList);
            //Action
            controller.fillFilter();
            // Assert
            expect(controller.replaceArrayContent).toHaveBeenCalled();
        });

    });

    describe('fillPagination function', function testController() {

        it('should change pagination vars', function onIt() {
            //Arrange
            controller.priceListItems.itemsPerPage = 4;
            controller.priceListItems.pageIndex = 3;
            controller.priceListItems.totalItems = 2;
            //Action
            controller.fillPagination();
            //Asert
            expect(controller.pagination.itemsPerPage).toEqual(4);
            expect(controller.pagination.pageIndex).toEqual(3);
            expect(controller.pagination.totalItems).toEqual(2);
        });

    });

    describe('onClassification1Change function', function () {
        it('should obtain an array with classification1Name', function onIt() {
            //Arrange
            controller.selectedClassification1 = '';
            spyOn(controller, 'setFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItemsFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.onClassification1Change('VEST');
            //Assert
            expect(controller.setFilters).toHaveBeenCalled();
            expect(controller.setFilters).toHaveBeenCalledWith({ classification1: 'VEST' });
            expect(controller.selectedClassification1).toEqual('VEST');
            expect(controller.updatePriceListItemsFilters).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.pagination.pageIndex).toEqual(1);
        });
    });

    describe('onClassification2Change function', function () {
        it('should obtain an array with classification2Name', function onIt() {
            //Arrange
            controller.selectedClassification2 = '';
            spyOn(controller, 'setFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItemsFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.onClassification2Change('HOM');
            //Assert
            expect(controller.setFilters).toHaveBeenCalled();
            expect(controller.setFilters).toHaveBeenCalledWith({
                classification2: 'HOM'
            });
            expect(controller.selectedClassification2).toEqual('HOM');
            expect(controller.updatePriceListItemsFilters).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.pagination.pageIndex).toEqual(1);
        });
    });

    describe('onProductClassChange function', function () {
        it('should obtain an array with productClass', function onIt() {
            //Arrange
            controller.selectedProductClasses = '';
            spyOn(controller, 'setFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItemsFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.onProductClassChange('class1');
            //Assert
            expect(controller.setFilters).toHaveBeenCalled();
            expect(controller.setFilters).toHaveBeenCalledWith({
                productClass: 'class1'
            });
            expect(controller.selectedProductClasses).toEqual('class1');
            expect(controller.updatePriceListItemsFilters).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.pagination.pageIndex).toEqual(1);
        });
    });

    describe('setFilters function', function () {
        it('receive filter classification1 and call function setFilter', function onIt() {
            //Arrange
            var params = { classification1: 'VEST' };
            spyOn(controller, 'setFilter').and.returnValue();
            //Action
            controller.setFilters(params);
            //Assert
            expect(controller.setFilter).toHaveBeenCalled();
            expect(controller.filters.useOr).toBe(false);
        });
        it('receive filter classification2 and call function setFilter', function onIt() {
            //Arrange
            var params = { classification2: 'MUJ' };
            spyOn(controller, 'setFilter').and.returnValue();
            //Action
            controller.setFilters(params);
            //Assert
            expect(controller.setFilter).toHaveBeenCalled();
        });
        it('receive filter productClass and call function setFilter', function onIt() {
            //Arrange
            var params = { productClass: 'Class1' };
            spyOn(controller, 'setFilter').and.returnValue();
            //Action
            controller.setFilters(params);
            //Assert
            expect(controller.setFilter).toHaveBeenCalled();
        });
        it('receive filter that not is category and not call function setFilter', function onIt() {
            //Arrange
            var params = { price: 200 };
            spyOn(controller, 'setFilter').and.returnValue();
            //Action
            controller.setFilters(params);
            //Assert
            expect(controller.setFilter).not.toHaveBeenCalled();
        });
    });

    describe('setFilter function', function () {
        it('should push a filter into filters', function onIt() {
            //Arrange
            controller.filters = {
                items: []
            };
            spyOn(controller, 'removeFilter').and.returnValue();

            //Action
            controller.setFilter({ test: 'test' });

            //Assert
            expect(controller.removeFilter).toHaveBeenCalled();
            expect(controller.filters.items[0].test).toEqual('test');
        });
    });

    describe('removeFilter function', function () {
        it('remove filter test without price', function onIt() {
            //Arrange
            controller.filters = {
                items: [{ by: 'test' }]
            };

            //Action
            controller.removeFilter({ by: 'test' });

            //Assert
            expect(controller.filters.items.length).toEqual(0);
        });
        it('remove filter test with price', function onIt() {
            //Arrange
            controller.filters = {
                items: [
                    { by: 'price', op: '1', value: 2 },
                    { by: 'price', op: '2', value: 3 }
                ]
            };

            //Action
            controller.removeFilter({ by: 'price', op: '1', value: 2 });

            //Assert
            expect(controller.filters.items.length).toEqual(1);
        });
    });

    describe('removeFilters function', function () {
        it('remove all the filters', function onIt() {
            //Arrange
            controller.filters = {
                items: [{ test: 'test' }]
            };
            //Action
            controller.removeFilters({ test: 'test' });
            //Assert
            expect(controller.filters.items.length).toEqual(0);

        });
    });

    describe('clearAllFilters function', function () {
        it('call the functions to clear filters', function onIt() {
            //Arrange
            spyOn(controller, 'clearCombos').and.returnValue();
            spyOn(controller, 'clearSearchBar').and.returnValue();
            spyOn(controller, 'removeFilters').and.returnValue();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.clearAllFilters();
            // Assert
            expect(controller.clearCombos).toHaveBeenCalled();
            expect(controller.clearSearchBar).toHaveBeenCalled();
            expect(controller.removeFilters).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
        });
    });

    describe('clearCombos function', function () {
        it('should set to "" all the filters selected', function onIt() {
            //Arrange
            controller.selectedClassification1 = 'selectedClassification1';
            controller.selectedClassification2 = 'selectedClassification2';
            controller.selectedProductClasses = 'selectedProductClasses';
            controller.priceTo = 5;
            controller.priceTo = 10;
            //Action
            controller.clearCombos();
            // Assert
            expect(controller.selectedClassification1).toBe('');
            expect(controller.selectedClassification2).toBe('');
            expect(controller.selectedProductClasses).toBe('');
            expect(controller.priceFrom).toBe(undefined);
            expect(controller.priceTo).toBe(undefined);
            expect(controller.pagination.pageIndex).toEqual(1);
        });
    });

    describe('clearSearchBar function', function () {
        it('should set to null all the filters selected', function onIt() {
            //Arrange
            controller.searchText = 'Blabla';
            //Action
            controller.clearSearchBar();
            // Assert
            expect(controller.searchText).toBe(null);
        });
    });

    describe('replaceArrayContent function', function testController() {

        it('replace data of an array', function onIt() {
            //Arrange
            var currentArray = [1, 2, 3];
            var newArray = [4, 5, 6];
            //Action
            controller.replaceArrayContent(currentArray, newArray);
            // Assert
            expect(currentArray).toEqual(newArray);
        });

    });

    describe('onPageChange function', function () {

        it('should call a function if param is different to actual pageIndex', function onIt() {
            //Arrange
            spyOn(controller, 'updatePriceListItems').and.returnValue($q.resolve());
            controller.priceListItems.pageIndex = 1;
            //Action
            controller.onPageChange(2);
            scope.$apply();
            //Assert
            expect(controller.updatePriceListItems).toHaveBeenCalled();
        });
        it('should not to call a function if param is equal than actual pageIndex', function onIt() {
            //Arrange
            spyOn(controller, 'updatePriceListItems').and.returnValue($q.resolve());
            controller.priceListItems.pageIndex = 1;
            //Action
            controller.onPageChange(1);
            scope.$apply();
            //Assert
            expect(controller.updatePriceListItems).not.toHaveBeenCalled();
        });
        it('should not to call a function if param is undefined', function onIt() {
            //Arrange
            spyOn(controller, 'updatePriceListItems').and.returnValue($q.resolve());
            controller.priceListItems.pageIndex = 1;
            //Action
            controller.onPageChange(undefined);
            scope.$apply();
            //Assert
            expect(controller.updatePriceListItems).not.toHaveBeenCalled();
        });
    });

    describe('onPageSizeChange function', function () {

        it('should call a function if param is different to actual itemsPerPage', function onIt() {
            //Arrange
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            controller.priceListItems.itemsPerPage = 1;
            //Action
            controller.onPageSizeChange(2);
            //Assert
            expect(controller.updatePriceListItems).toHaveBeenCalled();
        });
        it('should not to call a function if param is equal than actual itemsPerPage', function onIt() {
            //Arrange
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            controller.priceListItems.itemsPerPage = 1;
            //Action
            controller.onPageSizeChange(1);
            //Assert
            expect(controller.updatePriceListItems).not.toHaveBeenCalled();
        });
        it('should not to call a function if param is undefined', function onIt() {
            //Arrange
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            controller.priceListItems.itemsPerPage = 1;
            //Action
            controller.onPageSizeChange(undefined);
            //Assert
            expect(controller.updatePriceListItems).not.toHaveBeenCalled();
        });
    });

    describe('search function', function () {
        it('should not to generate filters because param is empty', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };

            spyOn(controller, 'setFilter').and.returnValue();
            spyOn(controller, 'clearAllFilters').and.returnValue();

            //Action
            controller.search('');
            //Assert
            expect(controller.clearAllFilters).toHaveBeenCalled();
            expect(controller.filters.items.length).toEqual(0);
        });
        it('should generate filters', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };

            spyOn(controller, 'setFilter').and.callThrough();
            spyOn(controller, 'updatePriceListItems').and.returnValue();

            //Action
            controller.search('Product1');
            //Assert
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.filters.items.length).toEqual(1); //Because actually there are four filters
        });
    });

    describe('isFullyLoaded function', function testController() {

        it('should return true', function onIt() {
            //Arrange
            controller.isFiltersLoading = true;
            controller.isItemsLoading = false;

            //Action
            controller.isFullyLoaded();
            // Assert
            expect(controller.isLoading).toEqual(true);
        });
        it('should return false', function onIt() {
            //Arrange
            controller.isFiltersLoading = false;
            controller.isItemsLoading = false;

            //Action
            controller.isFullyLoaded();
            // Assert
            expect(controller.isLoading).toEqual(false);
        });
    });

    describe('priceApply function', function () {
        it('should not to generate filters because filters are undefined', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };
            controller.priceFrom = undefined;
            controller.priceTo = undefined;

            spyOn(controller, 'setFilter').and.returnValue();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.priceApply();
            //Assert
            expect(controller.setFilter).not.toHaveBeenCalled();
            expect(controller.updatePriceListItems).not.toHaveBeenCalled();
            expect(controller.filters.items.length).toEqual(0);
        });
        it('should generate filters because filters for priceFrom', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };
            controller.priceFrom = 5;
            controller.priceTo = undefined;

            spyOn(controller, 'setFilter').and.callThrough();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.priceApply();
            //Assert
            expect(controller.setFilter).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.filters.items.length).toEqual(1);
        });
        it('should generate filters because filters for priceTo', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };
            controller.priceFrom = undefined;
            controller.priceTo = 5;

            spyOn(controller, 'setFilter').and.callThrough();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.priceApply();
            //Assert
            expect(controller.setFilter).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.filters.items.length).toEqual(1);
        });
        it('should generate two filters because all filters have prices', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };
            controller.priceFrom = 5;
            controller.priceTo = 10;

            spyOn(controller, 'setFilter').and.callThrough();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.priceApply();
            //Assert
            expect(controller.setFilter).toHaveBeenCalled();
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(controller.filters.items.length).toEqual(2);
        });
        it('should generate a error message if the filter "from" is greater than "to"', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };
            controller.priceFrom = 15;
            controller.priceTo = 10;

            spyOn(controller, 'setFilter').and.callThrough();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.priceApply();
            //Assert
            expect(controller.setFilter).not.toHaveBeenCalled();
            expect(controller.updatePriceListItems).not.toHaveBeenCalled();
            expect(controller.priceFilterError).not.toEqual('');
            expect(controller.filters.items.length).toEqual(0);
        });
        it('should generate a error message if the filter "from" is greater than "to"', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };
            controller.priceFrom = 15;
            controller.priceTo = 10;

            spyOn(controller, 'setFilter').and.callThrough();
            spyOn(controller, 'updatePriceListItems').and.returnValue();
            //Action
            controller.priceApply();
            //Assert
            expect(controller.setFilter).not.toHaveBeenCalled();
            expect(controller.updatePriceListItems).not.toHaveBeenCalled();
            expect(controller.priceFilterError).not.toEqual('');
            expect(controller.filters.items.length).toEqual(0);
        });
        it('should call removeFilter if filters are null', function onIt() {
            //Arrange
            controller.filters = {
                useOr: false,
                items: []
            };
            controller.priceFrom = null;
            controller.priceTo = null;

            spyOn(controller, 'setFilter').and.callThrough();
            spyOn(controller, 'removeFilter').and.returnValue();
            //Action
            controller.priceApply();
            //Assert
            expect(controller.setFilter).not.toHaveBeenCalled();
            expect(controller.priceFilterError).toEqual('');
            expect(controller.removeFilter).toHaveBeenCalled();
            expect(controller.filters.items.length).toEqual(0);

        });
    });

    describe('changeSorting function', function () {

        it('should Get All the PriceListItems ordereds by price descendent', function onIt() {
            //Arrange
            controller.clientId = mockClient.ContactId;
            spyOn(controller, 'updatePriceListItems').and.returnValue(null);
            spyOn(priceListsItemsSort, 'setSort').and.returnValue(null);
            //Action
            controller.changeSorting('PriceLists.sorting.higherPrice');
            // Assert
            expect(controller.updatePriceListItems).toHaveBeenCalled();
            expect(priceListsItemsSort.setSort).toHaveBeenCalledWith(mockClient.ContactId, controller.sortingSelected);
            expect(controller.sortingSelected).toEqual('PriceLists.sorting.higherPrice');
        });
    });

    describe('getSort function', function test() {
        it('should call sort and retunr asc', function onIt() {
            controller.clientId = mockClient.ContactId;
            spyOn(priceListsItemsSort, 'getSort').and.returnValue('PriceLists.sorting.lowerPrice');
            var result = controller.getSort();

            expect(result).toEqual('price asc');
            expect(priceListsItemsSort.getSort).toHaveBeenCalledWith(mockClient.ContactId);
        });
        it('should call sort and retunr desc', function onIt() {
            controller.clientId = mockClient.ContactId;
            spyOn(priceListsItemsSort, 'getSort').and.returnValue('PriceLists.sorting.higherPrice');
            var result = controller.getSort();

            expect(result).toEqual('price desc');
            expect(priceListsItemsSort.getSort).toHaveBeenCalledWith(mockClient.ContactId);
        });
        it('should call sort and retunr relevance', function onIt() {
            controller.clientId = mockClient.ContactId;
            spyOn(priceListsItemsSort, 'getSort').and.returnValue('PriceLists.sorting.moreRelevant');
            var result = controller.getSort();

            expect(result).toEqual('relevance desc');
            expect(priceListsItemsSort.getSort).toHaveBeenCalledWith(mockClient.ContactId);
        });
    });

    afterAll(function onAfterAll() {
        scope = null;
        controller = null;
        PriceListsItems = null;
        $q = null;
        deferred = null;
        PriceLists = null;
        mockPriceListItems = null;
        mockPriceList = null;
        mockClassificationFilterName = null;
        mockPriceListsItemsFilters = null;
        SambaCompanySettings = null;
        PriceListsItemsFilters = null;
        $translate = null;
    });
});