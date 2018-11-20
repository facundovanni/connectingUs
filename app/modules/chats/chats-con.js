(function ChatsCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.chats')
        .controller('ChatsController', ['Chats', '$rootScope', '$state', '$uibModal', '$q', 'toastr', '$translate',
            function (Chats, $rootScope, $state, $uibModal, $q, toastr, $translate) {
                var ctrl = this;
                ctrl.false = false;
                ctrl.chatsOthers = [];
                ctrl.chatsMy = [];

                ctrl.init = function init() {
                    //get the Chats
                    ctrl.checkLog();
                    ctrl.getChats();
                };

                ctrl.checkLog = function checkLog() {
                    if (!$rootScope.auth.isLoggedIn()) {
                        $state.go('/login');
                    }
                };

                ctrl.getChats = function getChats() {
                    ctrl.isLoading = true;
                    var promises = [];
                    Chats.getAllAsRequester({ idUser: $rootScope.session.getUserId() }).$promise
                        //promises.push(Chats.getAllAsOffertor({ idUser: $rootScope.session.getUserId() }).$promise);


                        .then(ctrl.setChatsRequester)
                        .catch(ctrl.catchChats)
                        .finally(ctrl.getOffertors);
                };

                ctrl.setChatsRequester = function setChats(result) {
                    ctrl.isLoading = false;
                    ctrl.chatsOthers = result;
                };
                ctrl.catchChats = function catchChats(result) {
                    toastr.error($translate.instant('global.message.saveError'));
                    ctrl.isLoading = false
                };
                ctrl.setChatsOffertors = function setChats(result) {
                    ctrl.isLoading = false;
                    ctrl.chatsMy = result;
                };

                ctrl.getOffertors = function getOffertors() {
                    Chats.getAllAsOffertor({ idUser: $rootScope.session.getUserId() }).$promise
                    .then(ctrl.setChatsOffertors)
                    .catch(ctrl.catchChats);
                }

                ctrl.modalInstance = {
                    templateUrl: 'modules/chats/templates/chats-crud.html',
                    controller: 'ChatsCRUDController as ctrl',
                    size: 'lg'
                };

                ctrl.openChat = function openChat(chat, type) {
                    ctrl.modalInstance.resolve = {
                        idChat: function resolve() { return chat.Id },
                        idAnotherUser: function resolve() { return type ? chat.UserOffertorId : chat.UserRequesterId },
                        idService: function resolve() { return chat.Service.Id },
                        type: type
                    };

                    $uibModal.open(ctrl.modalInstance).result.then(function success() {
                        ctrl.getChats();
                    });
                };

                ctrl.init();
            }

        ]);
})(angular);