(function chatsScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.chats')
        .service('Chats', ['ServicesModel', function (ServicesModel) {
            var that = this;
            angular.extend(this, ServicesModel.create('/api/chats', null, {
                getAllAsOffertor: {
                    method: 'GET',
                    url: '/api/chats/offertor/?idUser=:idUser',
                    isArray: true,
                    param: {
                        idUser: '@idUser'
                    }
                },
                getAllAsRequester:{
                    method: 'GET',
                    url: '/api/chats/requester/?idUser=:idUser',
                    isArray: true,
                    param: {
                        idUser: '@idUser'
                    }
                },
                get: {
                    method: 'GET',
                    url: '/api/chats/chat/?idChat=:idChat',
                    isArray: false,
                    param: {
                        idChat: '@idChat'
                    }
                },
                sendMessage: {
                    method: 'POST',
                    url: '/api/chats/messages'
                },
                isChatOpened:{
                    method:'POST',
                    url:'/api/chats/chat',
                    transformResponse: function response(data){
                        return {Id: data === 'null' ? undefined : data};
                    }
                }
            }));

        }]);
})(window.angular);