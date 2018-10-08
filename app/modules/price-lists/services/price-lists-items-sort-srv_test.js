describe('PriceListsItemsSort . Test - service', function onDescribe() {
    'use strict';
    var priceListsItemsSort, localStorageStore, mockClientId, key, mockData;

    mockClientId = 'A1';
    key = 'esales-price-list-';
    mockData = {
        items: []
    };

    beforeEach(module('app'));

    beforeEach(inject(function injectionFn(_priceListsItemsSort_, _localStorageStore_) { //jshint ignore:line
        priceListsItemsSort = _priceListsItemsSort_;
        localStorageStore = _localStorageStore_;
    }));

    describe('Check if is valid factory', function onDescribe() {

        it('Should contain a valid Product factory', function it() {
            expect(priceListsItemsSort).not.toBeNull();
            expect(priceListsItemsSort).toBeDefined();
        });
    });

    describe('getSort function', function test() {
        it('Should return the sort when localStorage is empty', function getItems() {
            spyOn(localStorageStore, 'getLocalStore').and.returnValue(undefined);
            spyOn(localStorageStore, 'saveLocalStore').and.returnValue(null);
            spyOn(localStorageStore, 'createBlankStore').and.returnValue(mockData);
            //Action
            var result = priceListsItemsSort.getSort(mockClientId);
            //Assert
            expect(localStorageStore.getLocalStore).toHaveBeenCalledWith(key, mockClientId);
            expect(localStorageStore.saveLocalStore).toHaveBeenCalledWith(key, mockClientId, mockData);
            expect(localStorageStore.createBlankStore).toHaveBeenCalled();
            expect(result).toEqual(priceListsItemsSort.sortingOptions[0]);
        });
        it('Should return the sort when has localStorage', function getItems() {
            mockData.sortingSelected = priceListsItemsSort.sortingOptions[1];
            spyOn(localStorageStore, 'getLocalStore').and.returnValue(JSON.stringify(mockData));
            spyOn(localStorageStore, 'saveLocalStore').and.returnValue(null);
            spyOn(localStorageStore, 'createBlankStore').and.returnValue(null);
            //Action
            var result = priceListsItemsSort.getSort(mockClientId);
            //Assert
            expect(localStorageStore.getLocalStore).toHaveBeenCalledWith(key, mockClientId);
            expect(localStorageStore.saveLocalStore).not.toHaveBeenCalled();
            expect(localStorageStore.createBlankStore).not.toHaveBeenCalled();
            expect(result).toEqual(priceListsItemsSort.sortingOptions[1]);
        });
    });

    describe('setSort function', function test() {
        it('Should not call blankStore', function getItems() {
            mockData.sortingSelected = priceListsItemsSort.sortingOptions[1];
            spyOn(localStorageStore, 'getLocalStore').and.returnValue(JSON.stringify(mockData));
            spyOn(localStorageStore, 'saveLocalStore').and.returnValue(null);
            spyOn(localStorageStore, 'createBlankStore').and.returnValue(null);
            //Action
            var aux = mockData;
            aux.sortingSelected = priceListsItemsSort.sortingOptions[0];
            priceListsItemsSort.setSort(mockClientId, priceListsItemsSort.sortingOptions[0]);
            //Assert
            expect(localStorageStore.getLocalStore).toHaveBeenCalledWith(key, mockClientId);
            expect(localStorageStore.saveLocalStore).toHaveBeenCalledWith(key, mockClientId, aux);
            expect(localStorageStore.createBlankStore).not.toHaveBeenCalled();
        });
        it('Should call BlankStore', function getItems() {
            spyOn(localStorageStore, 'getLocalStore').and.returnValue(undefined);
            spyOn(localStorageStore, 'saveLocalStore').and.returnValue(null);
            spyOn(localStorageStore, 'createBlankStore').and.callThrough();
            var aux = mockData;
            aux.sortingSelected = priceListsItemsSort.sortingOptions[1];
            //Action
            priceListsItemsSort.setSort(mockClientId,priceListsItemsSort.sortingOptions[1]);
            //Assert
            expect(localStorageStore.getLocalStore).toHaveBeenCalledWith(key, mockClientId);
            expect(localStorageStore.saveLocalStore).toHaveBeenCalledWith(key, mockClientId, aux);
            expect(localStorageStore.createBlankStore).toHaveBeenCalled();
        });
    });

    describe('return options function', function test() {
        it('Should return options', function getItems() {

            //Action
            var obj = priceListsItemsSort.sortingOptions;

            //Assert
            expect(obj.length).toEqual(3);

        });
    });
});