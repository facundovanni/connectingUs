(function usersGridScope(angular) {
  'use strict';
  angular.module('connectingUsCenter.offers').controller('OffersCRUDController', ['$scope', 'Offers', 'Countries', 'Cities', 'Categories', '$translate', '$stateParams', 'isMyOwn', '$q', '$state',
    function OffersCRUDController($scope, Offers, Countries, Cities, Categories, $translate, $stateParams, isMyOwn, $q, $state) {
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
      ctrl.validateError = {
        show: {},
        message: {
            title: $translate.instant('myOffer.error.title'),
            category: $translate.instant('myOffer.error.category'),
            country: $translate.instant('myOffer.error.country'),
            city: $translate.instant('myOffer.error.city'),
            description: $translate.instant('myOffer.error.description'),
            valdiate: $translate.instant('myOffer.error.validate')
        }
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
        if(ctrl.validate()){
        Offers.save(ctrl.offer).$promise
          .then(ctrl.onThenNew)
          .finally(ctrl.onFinallyUpdate);
        }
      }

      ctrl.onFinallyUpdate = function onFinally(result) {
        ctrl.isLoading = false;
        ctrl.goToMyOffers()
      };

      ctrl.onThenNew = function onThenNew(res) {
        alert("Service updated");
      };

      ctrl.cancelUpdate = function cancelUpdate() {
        ctrl.goToMyOffers();
      }

      ctrl.goToMyOffers = function goToMyOffers() {
        $state.go('/my-offers');
      }

      ctrl.validate = function validate() {
        ctrl.hasValidated = false;
        var validations = true;
        ctrl.validateError.show.title = !ctrl.offer.Title;
        ctrl.validateError.show.category = !ctrl.offer.Category;
        ctrl.validateError.show.country = !ctrl.offer.Country;
        ctrl.validateError.show.city = !ctrl.offer.City;
        ctrl.validateError.show.description = !ctrl.offer.Description;
        ctrl.validateError.show.validate = ctrl.offer.Validate == null;
        for (const prop in ctrl.validateError.show) {
          if (ctrl.validateError.show[prop]) {
            validations = false;
            ctrl.isLoading = false;
            break;
          }
        }
        ctrl.hasValidated = true;
        return validations;
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