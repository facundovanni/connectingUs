(function ChatsCRUDRateScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.chats').controller('ChatsCRUDRRateController',
        ['$uibModalInstance', '$rootScope', 'Chats', 'idChat', 'idUserRated', 'idService', 'toastr', '$translate',
            function ChatsCRUDRateController($uibModalInstance, $rootScope, Chats, idChat, idUserRated, idService, toastr, $translate) {
                var ctrl = this;
                ctrl.idService = idService;
                ctrl.idChat = idChat;
                ctrl.idUserRated = idUserRated;
                ctrl.value = 0;

                ctrl.sendRate = function save() {
                    ctrl.rate = {
                        Id: ctrl.idChat,
                        UserRequesterId: $rootScope.session.getUserId(),
                        UserOffertorId: ctrl.idUserRated,
                        Qualification: {
                            QualificationNumber: ctrl.value
                        }
                    };

                    ctrl.isLoading = true;
                    Chats.update(ctrl.rate).$promise
                        .then(ctrl.saveSuccess)
                        .catch(ctrl.error);
                };

                ctrl.saveSuccess = function saveSuccess(res) {
                    ctrl.isLoading = false;
                    toastr.success($translate.instant(ctrl.value ? 'chats.rate.ratedOk' : 'chat.rate.ratedOkNo'));
                    $uibModalInstance.close();
                };

                ctrl.error = function error() {
                    toastr.error($translate.instant('chats.rate.error'));
                };
            }]);
})(angular);