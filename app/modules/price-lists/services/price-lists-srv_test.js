describe('PriceLists service', function onDescribe() {
  'use strict';
  var PriceLists;

  beforeEach(module('app'));
  /*---------------
   ---MOCKS HERE---
   ---------------*/

  var mockPriceLists = [{
    id: '1',
    name: 'List1'
  }];

  /*----------------
  ---BEFORE EACH---
  ----------------*/

  beforeEach(inject(function injectionFn(_PriceLists_) { //jshint ignore:line
    PriceLists = _PriceLists_;
  }));

  describe('Check if is valid factory', function onDescribe() {

    it('Should contain a valid Product factory', function it() {
      expect(PriceLists).not.toBeNull();
      expect(PriceLists).toBeDefined();
    });
  });

  describe('get PriceLists', function test() {
    it('Should return an array of lists', function getItems() {
      spyOn(PriceLists, 'query').and.callFake(function fake() {
        return mockPriceLists;
      });
      var lists = PriceLists.query();
      expect(lists instanceof Array).toBeTruthy();
      expect(lists[0] instanceof Object).toBeTruthy();
      expect(lists[0].name).toEqual('List1');
    });
  });
});