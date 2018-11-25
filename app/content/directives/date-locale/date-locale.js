(function dateLocale(angular) {
    'use strict';
    angular.module('connectingUsCenter.directives')
        .directive('dateLocale', [function dateLocale() {
            var directive = {
                restrict: 'E',
                scope: {
                    date: '='
                },
                templateUrl: 'content/directives/date-locale/date-locale.html',
                controller: 'DateLocaleController',
                controllerAs: 'ctrl'
            };
            return directive;
        }])

        .controller('DateLocaleController', ['$scope', function DateLocaleController($scope) {
            var ctrl = this;
            ctrl.getDate = function getDate() {
                ctrl.date = moment($scope.date).format('L LT');
            };

            ctrl.getDate();
        }]);
})(angular);
