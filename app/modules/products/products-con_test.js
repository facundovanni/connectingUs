describe('Test - ProductsController', function () {
  'use strict';

  // load the controller's module
  beforeEach(module('app'));


  var scope, controller, Products, $timeout, $q;

  beforeEach(inject(function ($rootScope, $controller, _Products_, _$timeout_, _$q_) {
    scope = $rootScope.$new();
    Products = _Products_;
    $timeout = _$timeout_;
    $q = _$q_;
    controller = $controller('ProductsController', {
      $scope: scope,
    });
  }));

  describe('Test functionality of products controller', function testController() {

    it('should have an empty products array', function onIt() {
      expect(typeof controller.products).toEqual('object');
      expect(controller.products instanceof Array).toBe(true);
      expect(controller.products.length).toEqual(0);
    });

    //Tests
    it('Should be have a object which have products', function configureProducts() {
      expect(controller.products).toBeDefined();
    });
  });

  describe('Test if products can contain products', function getAnArray() {
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

     it('There are products', function () {

      controller.products = [];
      spyOn(Products,'query').and.callFake(function fake() {
        return mockProducts;
      });

      controller.init();

      
      expect(Products.query).toHaveBeenCalled();
      expect(controller.products).toEqual(mockProducts);

       });
    });

});