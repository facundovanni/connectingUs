(function ChatsCRUDScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.chats').controller('ChatsCRUDController',
        ['$uibModalInstance', 'Chats', 'idChat', 'idAnotherUser', 'idService', 'toastr', '$translate', 'type', '$uibModal', 'ConfirmationBox', 'User',
            function ($uibModalInstance, Chats, idChat, idAnotherUser, idService, toastr, $translate, type, $uibModal, ConfirmationBox, User) {
                var ctrl = this;
                ctrl.isMyOffer = type;
                ctrl.idService = idService;
                ctrl.idChat = idChat;
                ctrl.idAnotherUser = idAnotherUser;

                ctrl.cancel = function () {
                    $uibModalInstance.close();
                };

                ctrl.init = function init() {

                    User.getUserLogged().then(ctrl.setUser);
                };

                ctrl.setUser = function setUser(user) {
                    ctrl.user = user;
                    ctrl.me = { userId: ctrl.user.Id, userName: ctrl.user.Account.Nickname };
                    //get the Chats
                    if (!ctrl.idChat) {
                        ctrl.openChat();
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

                ctrl.openChat = function openChat() {
                    Chats.isChatOpened({ IdUser: ctrl.user.Id, IdService: ctrl.idService }).$promise
                        .then(ctrl.configureChat);
                };

                ctrl.configureChat = function configureChat(res) {
                    if (res.Id) {
                        ctrl.callChat(res);
                    } else {
                        var chat = {
                            Service: {
                                Id: ctrl.idService
                            },
                            UserRequesterId: ctrl.isMyOffer ? ctrl.idAnotherUser : ctrl.user.Id,
                            UserOffertorId: ctrl.isMyOffer ? ctrl.user.Id : ctrl.idAnotherUser,
                            LastMessageDate: new Date()
                        };
                        Chats.save(chat).$promise
                            .then(ctrl.callChat)
                            .catch(ctrl.sendError);
                    }
                };

                ctrl.callChat = function callChat(result) {
                    ctrl.idChat = result.Id;
                    ctrl.getChat();
                };

                ctrl.sendMessage = function sendMessage(message) {
                    var msj = {
                        IdChat: ctrl.idChat,
                        UserSenderId: ctrl.user.Id,
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
                };

                ctrl.sendError = function sendError() {
                    toastr.error($translate.instant('chats.message.sendError'));
                };

                ctrl.endChat = function endChat() {
                    ConfirmationBox.open().result.then(ctrl.goToRate);
                };

                ctrl.goToRate = function goToRate() {
                    var modalInstance = {
                        templateUrl: 'modules/chats/templates/chats-crud-rate.html',
                        controller: 'ChatsCRUDRRateController as ctrl',
                        size: 'md'
                    };

                    modalInstance.resolve = {
                        idChat: function resolve() { return ctrl.chat.Id },
                        idUserRated: function resolve() { return ctrl.idAnotherUser },
                        idService: function resolve() { return ctrl.idService },
                        idUser: function resolve() { return ctrl.user.Id }
                    };

                    $uibModal.open(modalInstance).result.then(function success() {
                        ctrl.cancel();
                    });
                }

                ctrl.init();

            }]);
})(angular);