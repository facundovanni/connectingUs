(function ChatsCRUDRateScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.chats').controller('ChatsCRUDRRateController',
        ['$uibModalInstance', '$rootScope', 'Chats', 'idChat', 'idUserRated', 'idService', 'toastr', '$translate',
            function ChatsCRUDRateController($uibModalInstance, $rootScope, Chats, idChat, idUserRated, idService, toastr, $translate) {
                var ctrl = this;
                ctrl.idService = idService;
                ctrl.idChat = idChat;
                ctrl.idUserRated = idUserRated;
                ctrl.rating = {
                    current: 1,
                    max: 5
                };
                ctrl.getSelectedRating = function (rating) {
                    ctrl.rating.current = rating;
                };
                ctrl.cancel = function cancel() {
                    ctrl.rating.current = undefined;
                    ctrl.sendRate();
                }

                ctrl.sendRate = function sendRate() {
                    ctrl.rate = {
                        Id: ctrl.idChat,
                        UserRequesterId: $rootScope.session.getUserId(),
                        UserOffertorId: ctrl.idUserRated
                    };
                    if (ctrl.rating.current) {
                        ctrl.rate.Qualification = { QualificationNumber: ctrl.rating.current }
                    }
                    
                    ctrl.isLoading = true;
                    Chats.update(ctrl.rate).$promise
                        .then(ctrl.saveSuccess)
                        .catch(ctrl.error);
                };

                ctrl.saveSuccess = function saveSuccess(res) {
                    ctrl.isLoading = false;
                    toastr.success($translate.instant(ctrl.rating.current ? 'chats.rate.ratedOk' : 'chats.rate.ratedOkNo'));
                    $uibModalInstance.close();
                };

                ctrl.error = function error() {
                    toastr.error($translate.instant('global.message.saveError'));
                };
            }]);
})(angular);