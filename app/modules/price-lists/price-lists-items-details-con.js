(function PriceListsItemsDetailsScope(application) {
    'use strict';
    application.app.lazy.controller('PriceListsItemsDetailsController', ['$stateParams', '$state', '$scope', 'PriceListsItems', 'PriceLists', 'ShoppingCart', '$translate', 'BluemoonNavigator', 'bmNumberService', 'RelatedItems',
        function PriceListsItemsDetailsController($stateParams, $state, $scope, PriceListsItems, PriceLists, ShoppingCart, $translate, BluemoonNavigator, bmNumberService, RelatedItems) {
            var that = this;
            that.itemID = 0;
            that.item = {};
            that.totalAmount = undefined; //Value
            that.inputQuantity = undefined;
            that.quantityError = '';
            that.currencySymbol = '';
            that.contactId = null;
            that.priceProduct = undefined;
            that.discountPrice = undefined;

            that.init = function init() {
                //get the id of the item clicked
                that.itemID = $stateParams.id;
                //get the item
                that.getItem();
                BluemoonNavigator.setSafeNavigationAway();
            };

            that.getItem = function getItem() {
                that.isLoadingItem = true;
                that.isFullyLoaded();
                that.item = PriceListsItems.get({ id: that.itemID });
                that.item.$promise.then(function item() {
                    that.priceProduct = that.formatterPrice(that.item.price);
                    that.discountPrice = that.formatterPrice(that.item.discountPrice);
                    that.totalAmount = that.formatterPrice(0); //Value
                    that.isLoadingItem = false;
                    that.isFullyLoaded();
                }).then(that.getCurrencySymbol())
                    .then(that.getRelatedItems());
            };

            that.getRelatedItems = function getRelatedItems() {
                that.isloadingRelatedItems = true;
                that.isFullyLoaded();
                RelatedItems.query({ id: that.itemID, count: 5 }).$promise.then(function onThen(items) {
                    that.relatedItems = items;
                    that.isloadingRelatedItems = false;
                    that.isFullyLoaded();
                });
            };

            that.getCurrencySymbol = function getCurrencySymbol() {
                //get the currency symbol of the pricelist in use
                that.isloadingCurrencySymbol = true;
                that.isFullyLoaded();
                PriceLists.query().$promise.then(function currencySymbol(pricelists) {
                    that.currencySymbol = pricelists[0].currencySymbol;
                    that.isloadingCurrencySymbol = false;
                    that.isFullyLoaded();
                });
            };

            that.calcAmount = function calcAmount() {
                that.quantityError = '';//Clean the error
                //Add inputQuantity validation
                if (that.inputQuantity === undefined || that.inputQuantity === null) {
                    that.inputQuantity = 0;
                }
                that.totalAmount = that.formatterPrice(that.price() * that.inputQuantity);
            };

            that.price = function price() {
                if (that.item.discountPrice > 0) {
                    return that.item.discountPrice;
                } else {
                    return that.item.price;
                }
            };

            that.save = function save() {
                if (!that.validate()) {
                    return;
                }
                ShoppingCart.addItem({
                    product: { id: that.item.product.id },
                    quantity: that.inputQuantity,
                    discount: that.discountID(),
                    discountRate: that.discountRate(),
                    vatCode: that.item.product.vatCode,
                    vatRate: that.item.product.vatRate,
                    unitPrice: that.price(),
                    totalAmount: bmNumberService.numberParser(that.totalAmount),
                    currencySymbol: that.currencySymbol,
                    priceListItemId: that.item.id
                });
                $scope.$emit('alert-success', $translate.instant('PriceLists.details.success'));
                that.goBack();

            };

            //Get the discount rate if the item (product) has one.
            that.discountRate = function getDiscountRate() {
                if (that.item.discountPrice) {
                    return that.item.product.discount.discountRates[0].rate;
                }
            };

            //Get the discount id if the item (product) has one.
            that.discountID = function discountID() {
                if (that.item.discountPrice) {
                    return { id: that.item.product.discount.id };
                }
            };

            that.validate = function validate() {
                if (that.inputQuantity > 0) {
                    return true;
                }
                $scope.$emit('alert-error', $translate.instant('message.general.error'), 0);
                that.quantityError = 'PriceLists.inputQuantityValidation';
                return false;
            };

            that.formatterPrice = function formatterPrice(value) {
                var formatter = bmNumberService.customNumberFormatter({
                    symbol: that.currencySymbol,
                    symbolPosition: 'left',
                    decimalPlaces: 2
                });
                return formatter(value);
            };

            that.isFullyLoaded = function isFullyLoaded() {
                that.isLoading = (that.isLoadingItem || that.isloadingCurrencySymbol || that.isloadingRelatedItems);
            };

            that.goBack = function goBack() {
                $state.go('/pricelists/index');
            };

            that.init();

        }]);
})(window.application);
