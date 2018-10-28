(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.myOffer').controller('MyOfferController', ['$scope', 'MyOffer', 'Countries', 'Cities', 'Categories', '$translate', '$state',
    function MyOfferController($scope, MyOffer, Countries, Cities, Categories, $translate, $state) {
      var ctrl = this;
      ctrl.isLoading = false;
      ctrl.isLoadingCountries = false;
      ctrl.isLoadingCities = false;
      ctrl.isLoadingCategories = false;
      ctrl.countries = [];
      ctrl.cities = [];
      ctrl.categories = [];
      
      ctrl.alert = {
        show: false,
        message: undefined,
        type: undefined
      }

      ctrl.offer = {};

      ctrl.getService = function getService(idService) {
        ctrl.isLoading = true;
        MyOffer.getService({ idService: idService }).$promise
          .then(ctrl.setOffer)
          .catch(ctrl.onCatchAccount)
          .finally(ctrl.onFinallyService);
      };

      ctrl.setOffer = function setOffer(result) {
        ctrl.offer = result[0];
      };

      ctrl.onFinallyService = function onFinallyService() {
        ctrl.isLoading = false;
        ctrl.getCategories();
        ctrl.getCountries();
        ctrl.getCities();
      };

      ctrl.isFullyLoaded = function isFullyLoaded() {
        ctrl.isLoading = ctrl.isLoadingCountries || ctrl.isLoadingOffers || ctrl.isLoadingCities || ctrl.isLoadingCategories;
      };

      ctrl.getCategories = function getCountries() {
        ctrl.isLoadingCategories = true;
        ctrl.isFullyLoaded();
        Categories.getAll().$promise
          .then(ctrl.setCategories)
          // .catch(ctrl.onCatchAccount)
          .finally(ctrl.onFinallyCategories);
      };

      ctrl.setCategories = function setCategories(result) {
        ctrl.categories = result;
      };

      ctrl.onFinallyCategories = function onFinallyCategories() {
        ctrl.isLoadingCategories = false;
        ctrl.isFullyLoaded();
      };

      ctrl.getCountries = function getCountries() {
        ctrl.isLoadingCountries;
        ctrl.isFullyLoaded();
        Countries.getAll().$promise
          .then(ctrl.setCountries)
          .finally(ctrl.onFinallyCountries);
      };

      ctrl.setCountries = function setCountries(result) {
        ctrl.countries = result;
      };

      ctrl.onFinallyCountries = function onFinallyCountries() {
        ctrl.isLoadingCountries = false;
        ctrl.isFullyLoaded();
      };

      ctrl.getCities = function getCities() {
        ctrl.isLoadingCities = true;
        ctrl.isFullyLoaded();
        Cities.getAll({ idCountry: ctrl.offer.Country.Id }).$promise
          .then(ctrl.setCities)
          .finally(ctrl.onFinallyCities);
      };

      ctrl.setCities = function setCities(result) {
        ctrl.cities = result;
      };

      ctrl.onFinallyCities = function onFinallyCities() {
        ctrl.isLoadingCities = false;
        ctrl.isFullyLoaded();
      };

      ctrl.onSelectCountry = function onSelectCountry() {
        ctrl.getCities();
      };

      ctrl.updateService = function udpateService() {
        ctrl.isLoading = true;
        MyOffer.update(ctrl.offer).$promise
        .then(ctrl.onThenNew)
        .finally(ctrl.onFinallyUpdate);
      }

      ctrl.onFinallyUpdate = function onFinally(result) {
        ctrl.isLoading = false;
      }

      ctrl.onThenNew = function onThenNew(res) {
        alert("Service updated");
      };


      ctrl.init = function init() {
        //The service id is hardcoded for now.
        ctrl.getService(5);
      };

      ctrl.init();
    }]);
})(angular);