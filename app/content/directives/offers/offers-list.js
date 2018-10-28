(function OffersList(angular) {
  'use strict';
  angular.module('connectingUsCenter.directives',['ngResource', 'ui.router'])
    .directive('offersList', [function OffersList() {
      var directive = {
        restrict: 'E',
        scope: {
          items: '=',
          itemNew:'=',
          openState: '='
        },
        templateUrl: 'content/directives/offers/offers-list.html',
        controller: 'OffersListController',
        controllerAs: 'ctrl'
      };
      return directive;
    }])

    .controller('OffersListController', ['$scope', '$state',
      function PriceListsItemListController($scope, $state) {
        var ctrl = this;
        ctrl.items = $scope.items;
        ctrl.itemNew = $scope.itemNew;

        ctrl.clickItem = function clickItem(item) {
          $state.go($scope.openState, item);
        };
      }]);
})(angular);
