(function OffersItem(angular) {
    'use strict';
    angular.module('connectingUsCenter.directives')
        .directive('offersItem', [function OffersItem() {
            var directive = {
                restrict: 'E',
                scope: {
                    item: '=',
                    onSelect: '&'
                },
                templateUrl: 'content/directives/offers/offers-item.html'
            };
            return directive;
        }]);
})(angular);
