(function UsersOffersCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.usersOffers')
        .controller('UsersOffersController', ['$scope', 'UsersOffers', '$translate','$state',
            function ($scope, UsersOffers, $translate,$state) {
                var ctrl = this;

                ctrl.offers = [];

                ctrl.offers.push({
                    title:'Título',
                    description: 'Esto es una descripción',
                    city:'city'
                });
            }
        ]);
})(angular);