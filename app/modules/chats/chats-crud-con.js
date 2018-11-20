(function ChatsCRUDScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.chats').controller('ChatsCRUDController',
        ['$uibModalInstance', '$rootScope', 'Chats', 'idChat', 'idAnotherUser', 'idService', 'toastr', '$translate', 'type',
            function ($uibModalInstance, $rootScope, Chats, idChat, idAnotherUser, idService, toastr, $translate, type) {
                var ctrl = this;
                ctrl.type = type;
                ctrl.idService = idService;
                ctrl.idChat = idChat;
                ctrl.idAnotherUser = idAnotherUser;
                ctrl.me = { userId: $rootScope.session.getUserId(), userName: $rootScope.session.getUser().Account.Nickname };

                ctrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                ctrl.init = function init() {
                    //get the Chats
                    if (!ctrl.idChat) {
                        ctrl.createChat();
                    } else {
                        ctrl.getChat();
                    }
                };

                ctrl.getChat = function getChat() {
                    ctrl.isLoading = true;
                    Chats.get({ idChat: ctrl.idChat }).$promise.then(ctrl.setChat);
                };

                ctrl.transformChat = function transformChat(chat) {
                    return { id: chat.Id, text: chat.Text, userId: chat.UserSenderId, userName: chat.UserSenderNickname, date: chat.Date };
                };

                ctrl.setChat = function setChat(chat) {
                    ctrl.chat = chat;
                    ctrl.chat.Messages = chat.Messages.map(ctrl.transformChat);
                    ctrl.isLoading = false;
                };

                ctrl.createChat = function createChat() {
                    var chat = {
                        Service: {
                            Id: ctrl.idService
                        },
                        UserRequesterId: ctrl.type ? ctrl.idAnotherUser : $rootScope.session.getUserId(),
                        UserOffertorId: ctrl.type ? $rootScope.session.getUserId() : ctrl.idAnotherUser,
                        LastMessageDate: new Date()
                    };
                    Chats.save(chat).$promise
                        .then(ctrl.callChat)
                        .catch(ctrl.sendError);
                };

                ctrl.callChat = function callChat(result) {
                    ctrl.idChat = result.Id;
                    ctrl.getChat();
                };

                ctrl.sendMessage = function sendMessage(message) {
                    var msj = {
                        IdChat: ctrl.idChat,
                        UserSenderId: $rootScope.session.getUserId(),
                        UserReceiverId: ctrl.idAnotherUser,
                        Text: message.text,
                        Date: new Date(message.date).toJSON()
                    };
                    Chats.sendMessage(msj).$promise
                        .then(ctrl.sendSuccesfull)
                        .catch(ctrl.sendError);
                };

                ctrl.sendSuccesfull = function sendSuccesfull(res) {
                    toastr.success($translate.instant('chats.message.sendOk'));
                    res.UserSenderNickname = ctrl.me.userName;
                    var newChat = ctrl.transformChat(res);
                    ctrl.chat.Messages.push(newChat);
                };

                ctrl.sendError = function sendError() {
                    toastr.error($translate.instant('chats.message.sendError'));
                };

                ctrl.init();

            }]);
})(angular);