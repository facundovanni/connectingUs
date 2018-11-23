(function ConfirmationBox(angular) {
    'use strict';
    angular.module('connectingUsCenter.components')
        .controller('ConfirmationBoxController', ['$uibModalInstance', '$rootScope', 'title','$translate', 
        function ($uibModalInstance, $rootScope, title,$translate) {
            var ctrl = this;
            ctrl.title = $translate.instant(title);
            ctrl.yes = function () {
                $uibModalInstance.close();
            };
            ctrl.no = function () {
                $uibModalInstance.dismiss();
            };
        }]);
})(angular);
