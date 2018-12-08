(function rootScope(angular) {
  'use strict';
  // Declare app level module which depends on views, and components
  angular.module('connectingUsCenter')
    .controller('AppController', ['$state', '$rootScope', 'Notifications','User', function AppController($state, $rootScope, Notifications,User) {
      var ctrl = this;
      ctrl.notifications = [];
      ctrl.types = {
        message: 1,
        qualification: 2,
      };
      ctrl.notificationCount = 0;
      ctrl.showNoNotification = false;
      ctrl.goToMyAccount = function goToMyAccount() {
        $state.go('/account');
      };

      ctrl.goToMyOffers = function goToOffers() {
        $state.go('/my-offers');
      };

      ctrl.goToOffers = function goToOffers() {
        $state.go('/offers');
      };

      ctrl.logout = function logout() {
        $rootScope.auth.logOut();
        $state.go('/login');
      };

      ctrl.goToAbout = function goToAbout() {
        $state.go('/about');
      };

      ctrl.goToMyChats = function goToMyChats() {
        $state.go('/chats');
      };

      ctrl.getNotifications = function getNotifications() {
        Notifications.getNotificationsByUser({ idUser: ctrl.user.Id }).$promise
          .then(ctrl.setNotifications)

      };

      ctrl.updateNotifications = function updateNotifications() {
        if (ctrl.notificationCount > 0) {
          Notifications.updateNotifications({ idUser: ctrl.user.Id }).$promise
            .then(ctrl.afterUpdateNotifications)
        } else {
          ctrl.notifications = [];
          ctrl.showNoNotification = true;

        }
      };

      ctrl.setNotifications = function setNotifications(result) {
        ctrl.notifications = result;
        ctrl.notificationCount = ctrl.notifications.length;
        ctrl.showNoNotification = !ctrl.notificationCount;
      };

      ctrl.afterUpdateNotifications = function afterUpdateNotifications(result) {
        ctrl.notificationCount = 0;
      };


      setInterval(function () {
        if ($rootScope.auth.isLoggedIn()) {
          ctrl.getNotifications();
        }
      }, 60000)

      ctrl.init = function init() {
        if ($rootScope.auth.isLoggedIn()) {
          User.getUserLogged().then(ctrl.setUser);
        }
      };

      ctrl.setUser = function setUser(user){
        ctrl.user = user;
        ctrl.getNotifications();
      };


      ctrl.init();

    }]);
})(angular);
