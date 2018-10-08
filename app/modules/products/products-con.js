(function ProductsScope(application) {
  'use strict';
  application.app.lazy.controller('ProductsController', ['$state','$scope', 'Products',
    function ProductsController($state, $scope, Products) {
      var that = this;
      //get all the products
      that.products = [];

      that.init = function init() {
        that.products = Products.query();
      };

      that.init();
    }]);
})(window.application);
