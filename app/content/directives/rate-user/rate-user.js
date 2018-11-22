(function starRating(angular) {
    'use strict';
    angular.module('connectingUsCenter.directives')
        .directive('starRating', [function starRating() {
            var directive = {
                restrict: 'E',
                scope: {
                    ratingValue: '=',
                    max: '=',
                    onRatingSelected: '&'
                },
                templateUrl: 'content/directives/rate-user/rate-user.html',
                controller: 'StarRatingController',
                controllerAs: 'ctrl'
            };
            return directive;
        }])

        .controller('StarRatingController', ['$scope',
            function StarRatingController($scope) {
                var ctrl = this;
                ctrl.updateStars = function updateStars() {
                    ctrl.stars = [];

                    for (var i = 0; i < $scope.max; i++) {
                        ctrl.stars.push({
                            filled: i < $scope.ratingValue
                        });
                    }
                };
                ctrl.toggle = function (index) {
                    $scope.ratingValue = index + 1;
                    $scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                $scope.$watch('ratingValue', function (oldVal, newVal) {
                    if (newVal) {
                        ctrl.updateStars();
                    }
                });
            }]);
})(angular);