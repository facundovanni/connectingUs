describe('Products service', function onDescribe() {
  'use strict';
  var Products, $timeout, $httpBackend;

  beforeEach(module('app'));
  /*---------------
   ---MOCKS HERE---
   ---------------*/

  var mockProducts = [{
    id: '1',
    name: 'Product1'
  }, {
    id: '2',
    name: 'Product2'
  }, {
    id: '3',
    name: 'Product3'
  }];

  /*----------------
  ---BEFORE EACH---
  ----------------*/


   

  beforeEach(inject(function injectionFn(_Products_, _$timeout_, _$httpBackend_) { //jshint ignore:line
    Products = _Products_;
    $timeout = _$timeout_;
    $httpBackend =_$httpBackend_;
    $httpBackend.expectGET('/api/samba-esales/v1/products/1').respond(200, mockProducts);
  }));

  describe('Check if is valid factory', function onDescribe() {

    it('Should contain a valid Product factory', function it() {
      expect(Products).not.toBeNull();
      expect(Products).toBeDefined();
    });
  });

    describe('get Products', function test() {
      it('Should get the products 1', function test(done) {
        
        $timeout.flush();

        expect(Products.length).toEqual(1);
        done();
      });
    });
});