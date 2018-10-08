(function ProductsDetailsScope(application) {
  'use strict';
  application.app.lazy.controller('ProductsDetailsController', ['$stateParams', '$state', '$scope', 'Products',
    function ProductsDetailsController($stateParams,$state, $scope, Products) {
      var that = this;
      that.productID = 0;
      that.product = [];
      that.inputUnit = 0; //Units entered
      that.totalAmount = 0; //Value

      that.init = function init() {
        //get the id of the product clicked
        that.productID = $stateParams.id;
        //get the product
        that.product = Products.get({ id: that.productID });
      };

      that.init();

      that.calcAmount = function calcAmount() {
        that.totalAmount = that.product.price * that.inputUnit;
      };
    }]);
})(window.application);
