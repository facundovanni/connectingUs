(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.myOffer').controller('MyOfferController', ['$scope', 'MyOffer', 'Countries', 'Cities', 'Categories', '$translate', '$state',
    function MyOfferController($scope, MyOffer, Countries, Cities, Categories, $translate, $state) {
      var ctrl = this;
      ctrl.isLoading = false;
      ctrl.isLoadingCountries = false;
      ctrl.isLoadingCities = false;
      ctrl.isLoadingCategories = false;
      ctrl.selectedCategory = {};
      ctrl.countries = [];
      ctrl.cities = [];
      ctrl.categories = [];

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
        ctrl.selectedCategory = ctrl.offer.Category;
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
          // .catch(ctrl.onCatchAccount)
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
          // .catch(ctrl.onCatchAccount)
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

      ctrl.saveService = function saveService() {
        MyOffer.save(ctrl.offer).$promise
        .then(ctrl.onThenNew)
        .finally(ctrl.onFinallySave);
      }

      ctrl.init = function init() {
        //The service id is hardcoded for now.
        ctrl.getService(5);
      };

      ctrl.init();
    }]);
})(angular);