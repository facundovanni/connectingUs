describe('PriceListsItemsFilters service', function onDescribe() {
  'use strict';
  var PriceListsItemsFilters, httpBackend;

  beforeEach(module('app'));
  /*---------------
   ---MOCKS HERE---
   ---------------*/

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

  /*----------------
  ---BEFORE EACH---
  ----------------*/

  beforeEach(inject(function injectionFn(_PriceListsItemsFilters_, $httpBackend) { //jshint ignore:line
    PriceListsItemsFilters = _PriceListsItemsFilters_;
    httpBackend = $httpBackend;
  }));

  //When the api its call it returns the mock data
  beforeEach(function beforeFn() {
    httpBackend.expectGET('/api/samba-esales/v1/price-lists/filters').respond(200, mockPriceListsItemsFilters);
  });

  describe('Check if is valid factory', function onDescribe() {

    it('Should contain a valid Product factory', function it() {
      expect(PriceListsItemsFilters).not.toBeNull();
      expect(PriceListsItemsFilters).toBeDefined();
    });
  });

  describe('get PriceListsItemsFilters', function test() {
    it('Should return the classification', function getItems() {

      //Action
      var obj = PriceListsItemsFilters.get();
      httpBackend.flush();
      //Assert
      expect(obj.productClassList).toEqual(mockPriceListsItemsFilters.productClassList);
      expect(obj.classification1NameList).toEqual(mockPriceListsItemsFilters.classification1NameList);
      expect(obj.classification2NameList).toEqual(mockPriceListsItemsFilters.classification2NameList);
    });
  });
});