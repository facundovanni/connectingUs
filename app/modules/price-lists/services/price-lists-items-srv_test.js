describe('PriceListsItems service', function onDescribe() {
  'use strict';
  var PriceListsItems;

  beforeEach(module('app'));
  /*---------------
   ---MOCKS HERE---
   ---------------*/

  var mockPriceListsItems = {
    items: [{
      id: '1',
      name: 'Product1'
    }, {
      id: '2',
      name: 'Product2'
    }, {
      id: '3',
      name: 'Product3',
      price: 300
    }]
  };

  /*----------------
  ---BEFORE EACH---
  ----------------*/




  beforeEach(inject(function injectionFn(_PriceListsItems_) { //jshint ignore:line
    PriceListsItems = _PriceListsItems_;
  }));

  describe('Check if is valid factory', function onDescribe() {

    it('Should contain a valid Item factory', function it() {
      expect(PriceListsItems).not.toBeNull();
      expect(PriceListsItems).toBeDefined();
    });
  });

  describe('get PriceListsItems', function test() {
    it('Should return an array of items', function getItems() {
      spyOn(PriceListsItems, 'get').and.callFake(function fake() {
        return mockPriceListsItems;
      });
      var priceListItems = PriceListsItems.get();
      expect(priceListItems.items instanceof Array).toBeTruthy();
      expect(priceListItems.items[0] instanceof Object).toBeTruthy();
      expect(priceListItems.items[0].name).toEqual('Product1');
    });
  });
});