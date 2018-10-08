describe('Test - PriceListsItemsItem', function () {
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
                    return value.toFixed(2).replace('.',',');
                };
            });
        });
    });
    var _compile, _scope, _controller, _templateCache, _service, _bmNumberService, _$controller, _$rootScope;

    beforeEach(inject(function beforeFunction($compile, $rootScope, $templateCache, $controller, PriceListsItems, bmNumberService) {
        _compile = $compile;
        _templateCache = $templateCache;
        _scope = $rootScope.$new();
        _bmNumberService = bmNumberService;

        _service = PriceListsItems;
        _$controller = $controller;
        _$rootScope = $rootScope;

    }));

    describe('PriceListsItemsItemController ', function () {

        beforeEach(function () {
            _scope.id = '1';
            _scope.image = '';
            _scope.description = 'Item1';
            _scope.price = 200;

            _controller = _$controller('PriceListsItemsItemController', {
                $scope: _scope
            });
        });

        describe('normalizeRate function', function testController() {
            it('Should give a number normalized', function () {
                //Arrange
                var number = 0.2;
                spyOn(_controller, 'formatterDiscount').and.callThrough();
                //Action
                var normalized = _controller.normalizeRate(number);
                //Assert
                expect(normalized).toEqual('20,00');
            });
        });

        describe('formatterPrice function', function testController() {

            it('should return the formated value', function onIt() {
                //Arrange
                spyOn(_bmNumberService, 'customNumberFormatter').and.callThrough();
                //Action
                var res = _controller.formatterPrice(500);
                // Assert
                expect(res).toEqual(500);
                expect(_bmNumberService.customNumberFormatter).toHaveBeenCalled();
            });
        });

        describe('formatterDiscount function', function testController() {

            it('should return the formated value', function onIt() {
                //Arrange
                spyOn(_bmNumberService, 'formatNumber').and.callThrough();
                //Action
                var res = _controller.formatterDiscount(10);
                // Assert
                expect(res).toEqual('10,00');
                expect(_bmNumberService.formatNumber).toHaveBeenCalled();
            });
        });
    });

    describe('priceListsItemsItem directive', function () {
        it('should set the class price-lists-items-container-discount when the rate is below 0', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.discount.discountRates[0].rate = -0.1;

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body div:nth-child(2)').hasClass('price-lists-items-container-discount')).toEqual(true);
        });

        it('should set the class price-lists-items-container when the rate is more than 0', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.discount.discountRates[0].rate = 1;

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body div:nth-child(2)').hasClass('price-lists-items-container')).toEqual(true);
        });

        it('should set the class discount-banner when the rate is below 0', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.discount.discountRates[0].rate = -0.1;

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .price-lists-items-container-discount .discount-banner').length).toEqual(1);
        });

        it('should not set the class discount-banner when the rate is more 0', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.discount.discountRates[0].rate = 1;

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .price-lists-items-container-discount .discount-banner').length).toEqual(0);
        });

        it('should set the class attribute1Name when the attribute1Name exist', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.attribute1Name = 'Product1';

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .attributeName').length).toEqual(1);
        });

        it('should not set the class attributeName when the attribute1Name not exist', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.attribute1Name = '';

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .attributeName').length).toEqual(0);
        });

        it('should set the class attribute2Name when the attribute2Name exist', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.attribute2Name = 'Product1';

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .attributeName').length).toEqual(1);
        });

        it('should not set the class attributeName when the attribute2Name not exist', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.attribute2Name = '';

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .attributeName').length).toEqual(0);
        });

        it('should set the class attribute3Name when the attribute3Name exist', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.attribute3Name = 'Product1';

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .attributeName').length).toEqual(1);
        });

        it('should not set the class attributeName when the attribute3Name not exist', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.attribute3Name = '';

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .attributeName').length).toEqual(0);
        });

        it('should set the classes price, discount and format-discount when the rate is below 0', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.discount.discountRates[0].rate = -0.1;

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .price .discount').length).toEqual(1);
            expect(element.find('.price-list-items-body .price .format-discount').length).toEqual(1);
        });

        it('should set the class price when the rate is more 0 (or equal)', function () {
            //Arrange
            _$rootScope.item = getBaseItem();
            _$rootScope.item.product.discount.discountRates[0].rate = 1;

            //Action
            var element = createDirective(_$rootScope);

            // Asserts
            expect(element.find('.price-list-items-body .price').length).toEqual(1);
        });
    });

    function createDirective(scope) {
        var element = _compile('<price-lists-items-item item="item" currency-symbol="currencySymbol"></price-lists-items-item>')(scope);
        scope.$digest();
        return element;
    }

    function getBaseItem() {
        return {
            product: {
                attribute1Name: '',
                attribute2Name: '',
                attribute3Name: '',
                comments: '',
                discount: {
                    discountRates: [
                        {
                            rate: 0
                        }
                    ],
                    id: ''
                },
                id: ''
            },
            price: 100,
            discountPrice: 100,
            id: ''
        };
    }

    afterAll(function onAfterAll() {
        _compile = null;
        _controller = null;
        _templateCache = null;
        _service = null;
        _bmNumberService = null;
        _$controller = null;
        _$rootScope = null;
    });

});