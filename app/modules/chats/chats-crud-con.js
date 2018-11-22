(function ChatsCRUDScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.chats').controller('ChatsCRUDController',
        ['$uibModalInstance', '$rootScope', 'Chats', 'idChat', 'idAnotherUser', 'idService', 'toastr', '$translate', 'type', '$uibModal',
            function ($uibModalInstance, $rootScope, Chats, idChat, idAnotherUser, idService, toastr, $translate, type, $uibModal) {
                var ctrl = this;
                ctrl.isMyOffer = type;
                ctrl.idService = idService;
                ctrl.idChat = idChat;
                ctrl.idAnotherUser = idAnotherUser;
                ctrl.me = { userId: $rootScope.session.getUserId(), userName: $rootScope.session.getUser().Account.Nickname };

                ctrl.cancel = function () {
                    $uibModalInstance.close();
                };

                ctrl.init = function init() {
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
                    Chats.isChatOpened({ IdUser: $rootScope.session.getUserId(), IdService: ctrl.idService }).$promise
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
                            UserRequesterId: ctrl.isMyOffer ? ctrl.idAnotherUser : $rootScope.session.getUserId(),
                            UserOffertorId: ctrl.isMyOffer ? $rootScope.session.getUserId() : ctrl.idAnotherUser,
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

                ctrl.endChat = function endChat() {

                    if (!ctrl.isMyOffer) {

                        var modalInstance = {
                            templateUrl: 'modules/chats/templates/chats-crud-rate.html',
                            controller: 'ChatsCRUDRRateController as ctrl',
                            size: 'md'
                        };

                        modalInstance.resolve = {
                            idChat: function resolve() { return ctrl.chat.Id },
                            idUserRated: function resolve() { return ctrl.idAnotherUser },
                            idService: function resolve() { return ctrl.idService }
                        };

                        $uibModal.open(modalInstance).result.then(function success() {
                            ctrl.cancel();
                        });
                    }

                };

                ctrl.init();

            }]);
})(angular);