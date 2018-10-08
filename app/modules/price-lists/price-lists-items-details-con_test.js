describe('Test - PriceListItemsDetailsController', function () {
    'use strict';

    // load the controller's module
    var scope, controller, PriceListItems, PriceList, deferred, $q, ShoppingCart, bmNumberService, RelatedItems, $state, $translate;

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
            });
        });
    });

    var mockItem = {
        id: '1',
        price: 200
    };
    var mockItem2 = {
        id: '2',
        product: {
            name: 'Item2',
            detail1: 'detail',
            decimals: 2,
            discount: {
                discountRates: [
                    {
                        rate: -0.1
                    }
                ],
                id: 'D2'
            }
        },
        price: 200,
        discountPrice: 100
    };
    var mockPriceList = [{
        id: '1',
        currencySymbol: '$'
    }];

    beforeEach(inject(function ($rootScope, $controller, _PriceListsItems_, _PriceLists_, _$q_, _ShoppingCart_, _bmNumberService_, _RelatedItems_, _$state_, _$translate_) {
        scope = $rootScope.$new();
        PriceListItems = _PriceListsItems_;
        PriceList = _PriceLists_;
        $q = _$q_;
        deferred = $q.defer();
        ShoppingCart = _ShoppingCart_;
        bmNumberService = _bmNumberService_;
        RelatedItems = _RelatedItems_;
        $state = _$state_;
        $translate = _$translate_;
        controller = $controller('PriceListsItemsDetailsController', {
            $scope: scope,
        });

    }));

    describe('Init function', function testController() {

        it('should Get the itemID, PriceListItem and Get the currencySymbol of the PriceList', function onIt() {
            //Arrange
            controller.itemID = '1';
            spyOn(controller, 'getItem').and.returnValue();
            //Action
            controller.init();
            // Assert
            expect(controller.getItem).toHaveBeenCalled();

        });

    });

    describe('getItem function', function testController() {

        it('should Get the Item.', function onIt() {
            //Arrange
            controller.item = '';
            spyOn(controller, 'getCurrencySymbol').and.returnValue(mockPriceList);
            spyOn(controller, 'getRelatedItems').and.returnValue([1, 2]);
            spyOn(controller, 'isFullyLoaded').and.returnValue(null);
            spyOn(PriceListItems, 'get').and.callFake(function onFake() {
                deferred.resolve(mockItem2);
                return { $promise: deferred.promise };
            });
            spyOn(controller, 'formatterPrice').and.returnValue('$200');
            //Action
            controller.getItem();
            scope.$apply();
            // Assert
            expect(PriceListItems.get).toHaveBeenCalled();
            expect(controller.getCurrencySymbol).toHaveBeenCalled();
            expect(controller.getRelatedItems).toHaveBeenCalled();
            expect(controller.item.$promise).toBeDefined();
            expect(controller.formatterPrice).toHaveBeenCalled();
            expect(controller.isFullyLoaded).toHaveBeenCalled();
            expect(controller.isLoadingItem).toBeFalsy();
        });

    });

    describe('getCurrencySymbol function', function testController() {

        it('should get the currency symbol of the pricelist in use', function onIt() {
            //Arrange
            controller.currencySymbol = '';
            spyOn(PriceList, 'query').and.callFake(function onFake() {
                deferred.resolve(mockPriceList);
                return { $promise: deferred.promise };
            });
            spyOn(controller, 'isFullyLoaded').and.returnValue(null);
            //Action
            controller.getCurrencySymbol();
            scope.$apply();
            // Assert
            expect(PriceList.query).toHaveBeenCalled();
            expect(controller.currencySymbol).toEqual('$');
            expect(controller.isFullyLoaded).toHaveBeenCalled();
            expect(controller.isLoadingCurrencySymbol).toBeFalsy();
        });

    });

    describe('getRelatedItems function', function testController() {
        it('should get the related items', function onIt() {
            //Arrange
            spyOn(RelatedItems, 'query').and.callFake(function onFake() {
                deferred.resolve([mockItem, mockItem2]);
                return { $promise: deferred.promise };
            });
            spyOn(controller, 'isFullyLoaded').and.returnValue(null);
            //Action
            controller.getRelatedItems();
            scope.$apply();
            // Assert
            expect(RelatedItems.query).toHaveBeenCalled();
            expect(controller.relatedItems.length).toEqual(2);
            expect(controller.isFullyLoaded).toHaveBeenCalled();
            expect(controller.isloadingRelatedItems).toBeFalsy();
        });

    });

    describe('calcAmount function', function testController() {

        it('should get the total amount', function onIt() {
            //Arrange
            controller.item = mockItem2;
            spyOn(controller, 'price').and.returnValue(10);
            spyOn(controller, 'formatterPrice').and.returnValue('$40.00');
            //Action
            controller.inputQuantity = 4.00;
            controller.calcAmount();
            // Assert
            expect(controller.price).toHaveBeenCalled();
            expect(controller.formatterPrice).toHaveBeenCalled();
            expect(controller.totalAmount).toEqual('$40.00');
            expect(controller.totalAmount).not.toEqual(40);
            expect(controller.quantityError).toEqual('');
        });
        it('should get the total amount', function onIt() {
            //Arrange
            controller.item = mockItem2;
            spyOn(controller, 'price').and.returnValue(10);
            spyOn(controller, 'formatterPrice').and.returnValue('$00.00');
            //Action
            controller.inputQuantity = null;
            controller.calcAmount();
            // Assert
            expect(controller.price).toHaveBeenCalled();
            expect(controller.formatterPrice).toHaveBeenCalled();
            expect(controller.totalAmount).toEqual('$00.00');
            expect(controller.quantityError).toEqual('');
        });

    });

    describe('price function', function testController() {

        it('should get the price without discount', function onIt() {
            //Arrange
            controller.item = mockItem;
            //Action
            // Assert
            expect(controller.price()).toEqual(200);
        });
        it('should get the price discount', function onIt() {
            //Arrange
            controller.item = mockItem2;
            //Action
            // Assert
            expect(controller.price()).toEqual(100);
        });
    });

    describe('discountRate function', function testController() {

        it('should get the discountRate of the item', function onIt() {
            //Arrange
            controller.item = mockItem2;
            //Action
            var discount = controller.discountRate();
            // Assert
            expect(discount).toEqual(-0.1);
        });
        it('should not get the discountRate of the item because it has not discount', function onIt() {
            //Arrange
            controller.item = mockItem;
            //Action
            var discount = controller.discountRate();
            // Assert
            expect(discount).not.toBeDefined();
        });
    });

    describe('save function', function testController() {

        it('should call validate function', function onIt() {
            //Arrange
            spyOn(controller, 'validate').and.returnValue(false);
            spyOn(controller, 'goBack').and.returnValue(null);
            spyOn(scope, '$emit').and.returnValue(null);
            spyOn($translate, 'instant').and.returnValue(null);
            //Action
            controller.save();
            // Assert
            expect(controller.validate).toHaveBeenCalled();
            expect(scope.$emit).not.toHaveBeenCalled();
            expect($translate.instant).not.toHaveBeenCalled();
            expect(controller.goBack).not.toHaveBeenCalled();
        });
        it('should call validate function and addItem to ShoppingCart', function onIt() {
            controller.item = mockItem2;
            //Arrange
            spyOn(controller, 'validate').and.returnValue(true);
            spyOn(ShoppingCart, 'addItem').and.returnValue(null);
            spyOn(scope, '$emit').and.returnValue(null);
            spyOn($translate, 'instant').and.returnValue(null);
            spyOn(controller, 'goBack').and.returnValue(null);
            //Action
            controller.save();
            // Assert
            expect(controller.validate).toHaveBeenCalled();
            expect(ShoppingCart.addItem).toHaveBeenCalled();
            expect(scope.$emit).toHaveBeenCalledWith('alert-success', $translate.instant('PriceLists.details.success'));
            expect($translate.instant).toHaveBeenCalledWith('PriceLists.details.success');
            expect(controller.goBack).toHaveBeenCalled();
        });
    });

    describe('discountID function', function testController() {

        it('should get the discountID', function onIt() {
            //Arrange
            controller.item = mockItem2;
            //Action
            // Assert
            expect(controller.discountID()).toEqual({ id: 'D2' });
        });

        it('should not get the discountID of the item because it has not discount', function onIt() {
            //Arrange
            controller.item = mockItem;
            //Action
            var discountID = controller.discountID();
            // Assert
            expect(discountID).not.toBeDefined();
        });
    });

    describe('validate function', function testController() {

        it('should validate return true', function onIt() {
            //Arrange
            controller.inputQuantity = 1;
            //Action

            // Assert
            expect(controller.validate()).toBe(true);
        });
        it('should validate return false', function onIt() {
            //Arrange
            controller.inputQuantity = 0;
            //Action

            // Assert
            expect(controller.validate()).toBe(false);
        });
    });

    describe('formatterPrice function', function testController() {

        it('should return the formated value', function onIt() {
            //Arrange
            spyOn(bmNumberService, 'customNumberFormatter').and.callThrough();
            //Action
            var res = controller.formatterPrice('500');
            // Assert
            expect(res).toEqual('500');
            expect(bmNumberService.customNumberFormatter).toHaveBeenCalled();
        });
    });

    describe('isFullyLoaded function', function initMethod() {
        it('should return true', function onTest() {
            controller.isLoadingItem = true;
            controller.isloadingRelatedItems = false;
            controller.isloadingCurrencySymbol = false;
            //action
            controller.isFullyLoaded();
            //assert
            expect(controller.isLoading).toBeTruthy();
        });
        it('should return true', function onTest() {
            controller.isLoadingItem = false;
            controller.isloadingRelatedItems = false;
            controller.isloadingCurrencySymbol = false;
            //action
            controller.isFullyLoaded();
            //assert
            expect(controller.isLoading).toBeFalsy();
        });
    });

    describe('goBack function', function initMethod() {
        it('should call state.go', function onTest() {
            spyOn($state, 'go').and.returnValue(null);
            //action
            controller.goBack();
            //assert
            expect($state.go).toHaveBeenCalledWith('/pricelists/index');
        });
    });

    afterAll(function onAfterAll() {
        scope = null;
        controller = null;
        PriceListItems = null;
        $q = null;
        deferred = null;
        PriceList = null;
        ShoppingCart = null;
        mockPriceList = null;
        mockItem = null;
        mockItem2 = null;
        RelatedItems = null;
        $state = null;
        $translate = null;
    });
});