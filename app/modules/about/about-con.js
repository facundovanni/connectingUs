(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.about').controller('AboutController', ['$scope', 'About', 'Countries', '$translate', '$state',
    function aboutController($scope, About, Countries, $translate, $state) {
      var ctrl = this;
      ctrl.isLoadingCountries = false;
      ctrl.isLoadingMap = false;
      ctrl.countriesOfService = [];
 

      ctrl.loadMap = function loadMap() {
        ctrl.isLoadingMap = true;
        ctrl.map = L.map('mapDiv').setView(["42.546245", "16.01554"], 2);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 5,  //zooom
        }).addTo(ctrl.map);

        angular.forEach(ctrl.countriesOfService, function (value, key) {
          ctrl.marker = L.marker([value.Latitude, value.Longitude]).addTo(ctrl.map);
          ctrl.marker.bindPopup("<b>" + value.Name + "</b>").openPopup();
        }); 
       
        ctrl.isLoadingMap = false;
      }

       ctrl.getCountriesOfServices = function getCountries() {
         ctrl.isLoadingCountries = true;
         Countries.getCountriesOfServices().$promise
           .then(ctrl.setCountriesOfService)
           .finally(ctrl.onFinallyCountriesOfService);
       };
 
       ctrl.setCountriesOfService = function setCountries(result) {
         ctrl.countriesOfService = result;
       };
 
       ctrl.onFinallyCountriesOfService = function onFinallyCountries() {
         ctrl.isLoadingCountries = false;
         ctrl.loadMap();
       };
 
       ctrl.init = function init() {
         ctrl.getCountriesOfServices();
       };
 
       ctrl.init();
 
    }]);
})(angular);