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
      ctrl.myOffer = isMyOwn;
      ctrl.alert = {
        show: false,
        message: undefined,
        type: undefined
      };

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
      };

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