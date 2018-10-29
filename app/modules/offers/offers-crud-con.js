(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.offers').controller('OffersCRUDController', ['$scope', 'Offers', 'Countries', 'Cities', 'Categories', '$translate', '$stateParams', 'isMyOwn', '$q',
    function OffersCRUDController($scope, Offers, Countries, Cities, Categories, $translate, $stateParams, isMyOwn, $q) {
      var ctrl = this;
      ctrl.isLoading = false;
      ctrl.isLoadingCountries = false;
      ctrl.isLoadingCities = false;
      ctrl.isLoadingCategories = false;
      ctrl.countries = [];
      ctrl.cities = [];
      ctrl.categories = [];
      ctrl.offer = {};
      ctrl.offer.Id = $stateParams.Id;
      ctrl.alert = {
        show: false,
        message: undefined,
        type: undefined
      }

      // ctrl.getService = function getService(idService) {
      //   ctrl.isLoading = true;
      //   Offers.getService({ idService: ctrl.offer.Id }).$promise
      //     .then(ctrl.setOffers)
      //     .catch(ctrl.onCatchAccount)
      //     .finally(ctrl.onFinallyService);
      // };

      // ctrl.setOffers = function setOffers(result) {
      //   ctrl.offer = result[0];
      // };

      // ctrl.onFinallyService = function onFinallyService() {
      //   ctrl.isLoading = false;
      //   ctrl.getCategories();
      //   ctrl.getCountries();
      //   ctrl.getCities();
      // };

      // ctrl.isFullyLoaded = function isFullyLoaded() {
      //   ctrl.isLoading = ctrl.isLoadingCountries || ctrl.isLoadingOfferss || ctrl.isLoadingCities || ctrl.isLoadingCategories;
      // };

      // ctrl.getCategories = function getCountries() {
      //   ctrl.isLoadingCategories = true;
      //   ctrl.isFullyLoaded();
      //   Categories.getAll().$promise
      //     .then(ctrl.setCategories)
      //     // .catch(ctrl.onCatchAccount)
      //     .finally(ctrl.onFinallyCategories);
      // };

      // ctrl.setCategories = function setCategories(result) {
      //   ctrl.categories = result;
      // };

      // ctrl.onFinallyCategories = function onFinallyCategories() {
      //   ctrl.isLoadingCategories = false;
      //   ctrl.isFullyLoaded();
      // };

      // ctrl.getCountries = function getCountries() {
      //   ctrl.isLoadingCountries;
      //   ctrl.isFullyLoaded();
      //   Countries.getAll().$promise
      //     .then(ctrl.setCountries)
      //     .finally(ctrl.onFinallyCountries);
      // };

      // ctrl.setCountries = function setCountries(result) {
      //   ctrl.countries = result;
      // };

      // ctrl.onFinallyCountries = function onFinallyCountries() {
      //   ctrl.isLoadingCountries = false;
      //   ctrl.isFullyLoaded();
      // };

      ctrl.getCities = function getCities() {
        ctrl.isLoading = true;
        Cities.getAll({
            idCountry: ctrl.offer.Country.Id
          }).$promise
          .then(ctrl.setCities)
          .finally(ctrl.onFinallyCities);
      };

      ctrl.setCities = function setCities(result) {
        ctrl.cities = result;
      };

      ctrl.onFinallyCities = function onFinallyCities() {
        ctrl.isLoading = false;
      };

      ctrl.onSelectCountry = function onSelectCountry() {
        ctrl.getCities();
      };

      ctrl.updateService = function udpateService() {
        ctrl.isLoading = true;
        Offers.save(ctrl.offer).$promise
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
        ctrl.isLoading = true;
        var promises = [];

        promises.push(Categories.getAll().$promise);
        promises.push(Countries.getAll().$promise);
        if (ctrl.offer.Id) {
          promises.push(Offers.getService({
            idService: ctrl.offer.Id
          }).$promise);
        }

        $q.all(promises).then(function onThen(result) {

          ctrl.categories = result[0];
          ctrl.countries = result[1];
          if (result[2][0]) {
            ctrl.offer = result[2][0];
            ctrl.getCities();
          } else{
            ctrl.offer = {};
          }
          ctrl.offer.userId = 1;
        }).finally(function onFinally() {
          ctrl.isLoading = false;
        });

      };

      ctrl.init();
    }
  ]);
})(angular);