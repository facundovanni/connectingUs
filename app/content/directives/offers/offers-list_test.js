describe('Test - PriceListsItemsList', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('app.templates'));
  beforeEach(module('app'));

  beforeEach(function be() {
    module(function m($provide) {
      $provide.service('bmNumberService', function setServices() {
        this.customNumberFormatter = function customNumberFormatter() {
          return function formatter(value) {
            return value;
          };
        };
        this.numberParser = function numberParser(value) {
          return value;
        };
        this.formatNumber = function formatNumber(value) {
          return value;
        };
      });
    });
  });

  var _compile, _scope, _controller, _templateCache, _service, _$controller, _$rootScope,_$state;

  beforeEach(inject(function beforeFunction($compile, $rootScope, $templateCache, $controller, PriceListsItems,$state) {
    _compile = $compile;
    _templateCache = $templateCache;
    _scope = $rootScope.$new();
    _$state = $state;
    _service = PriceListsItems;
    _$controller = $controller;
    _$rootScope = $rootScope;
  }));

  describe('PriceListsItemsListController', function testController() {
    beforeEach(function () {
      _scope = [
      {
        id: '1',
        image: '',
        description: 'Item1',
        price: 200
      },
      {
        id: '2',
        description: 'Item2',
        price: 300
      }
      ];

      _controller = _$controller('PriceListsItemsListController', {
        $scope: _scope,
        $state: _$state
      });
    });
    describe('Test functionality of PriceListsItems list controller', function testController() {
      it('Receive an array of PriceListsItems', function () {
        expect(_controller.PriceListsItems).toEqual(_scope.PriceListsItems);
      });
    });

    describe('clickItem function', function testController() {

      it('should go to the item', function onIt() {
        //Arrange
        _controller.items = _scope;
        spyOn(_$state, 'go').and.returnValue();
        //Action
        _controller.clickItem(_controller.items[0]);
        // Assert
        expect(_$state.go).toHaveBeenCalled();
      });
    });
  });

  describe('priceListsItemsItem directive', function () {
    it('should have a li if there are items', function () {
      //Arrange
      _$rootScope.items = [];
      _$rootScope.items = getBaseItems();
      //Action
      var element = createDirective(_$rootScope);
      // Asserts
      expect(element.find('li:nth-child(2)').length).toEqual(1);
    });
    it('should have a li if there are items', function () {
      //Arrange
      _$rootScope.items = [];
      //Action
      var element = createDirective(_$rootScope);
      // Asserts
      expect(element.find('li:nth-child(2)').length).toEqual(0);
    });
  });

  function createDirective(scope) {
    var element = _compile('<price-lists-items-list open-state="state" items="items" currency-symbol="currencySymbol"></price-lists-items-list>')(scope);
    scope.$digest();
    return element;
  }

  function getBaseItems() {
    var array = [];
    array[0] = { id: 1 };
    array[1] = { id: 2 };
    array[2] = { id: 3 };
    return array;
  }
    
  afterAll(function onAfterAll() {
    _compile = null;
    _controller = null;
    _templateCache = null;
    _service = null;
    _$controller = null;
    _$rootScope =null;
  });
});