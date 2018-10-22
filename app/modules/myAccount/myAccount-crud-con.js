(function MyAccountCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.myAccount')
        .controller('myAccountCRUDController', ['MyAccount', '$translate', '$state', 'Countries', 'Cities',
            function (MyAccount, $translate, $state, Countries, Cities) {
                var ctrl = this;
                ctrl.today = new Date();
                ctrl.validateError = {
                    show: {},
                    message: {
                        text: $translate.instant('global.error.textRequired'),
                        emailConfirm: $translate.instant('myAccount.error.emailConfirm'),
                        passwordConfirm: $translate.instant('myAccount.error.passwordConfirm'),
                        email: $translate.instant('myAccount.error.email'),
                        password: $translate.instant('myAccount.error.password'),
                    }
                };

                ctrl.alert = {
                    show: false,
                    message: undefined,
                    type: undefined
                }

                ctrl.dateSelected = {
                    value: ctrl.today,
                    opened: false
                };

                ctrl.dateOptions = {
                    formatYear: 'yyyy',
                    maxDate: ctrl.today.setYear(ctrl.today.getFullYear() - 13),
                    startingDay: 0
                };

                ctrl.openDate = function openDate() {
                    ctrl.dateSelected.opened = true;
                };

                ctrl.fillArrays = function fillArrays() {
                    ctrl.genders = [{
                        code: 'M',
                        description: $translate.instant('global.gender.male')
                    }, {
                        code: 'F',
                        description: $translate.instant('global.gender.female')
                    }, {
                        code: 'O',
                        description: $translate.instant('global.gender.other')
                    }];
                    ctrl.phoneTypes =[
                        { code:'M', description: 'global.phoneType.mobile'},
                        { code:'H', description: 'global.phoneType.home'},
                        { code:'O', description: 'global.phoneType.other'}
                    ]
                    ctrl.isLoadingCountries = true;
                    ctrl.isLoadingOptions();
                    Countries.getAll().$promise
                        .then(ctrl.setCountries)
                        .catch(ctrl.onCatchAccount)
                        .finally(ctrl.onFinallyCountries);
                };

                ctrl.setCountries = function setCountries(result) {
                    ctrl.countries = result;
                    ctrl.nationalities = result;
                };
                ctrl.onFinallyCountries = function onFinallyCountries() {
                    ctrl.isLoadingCountries = false;
                    ctrl.isLoadingOptions();
                };

                ctrl.myAccount = MyAccount.getDefaultEntity();

                ctrl.init = function init() {
                    ctrl.fillArrays();
                    ctrl.getAccount();
                };

                ctrl.onChangeCountries = function onChangeCountries() {
                    if (ctrl.myAccount.countryofresidence.Id) {
                        ctrl.isLoadingCities = true;
                        ctrl.isLoadingOptions();
                        Cities.getAll({idCountry: ctrl.myAccount.countryofresidence.Id}).$promise
                            .then(ctrl.setCities)
                            .finally(ctrl.onFinallyCities);
                    }
                };

                ctrl.setCities = function setCities(result) {
                    ctrl.cities = result;

                };
                ctrl.onFinallyCities = function onFinallyCountries() {
                    ctrl.isLoadingCities = false;
                    ctrl.isLoadingOptions();
                };


                ctrl.setView = function setView() {
                    ctrl.title = ctrl.myAccount.id ? $translate.instant('myAccount.title') : $translate.instant('myAccount.titleSignUp');
                    ctrl.isLoadingAccount = false;
                    ctrl.isLoadingOptions();
                };

                ctrl.setEdit = function setEdit(boolean) {
                    ctrl.disabled = !boolean;
                };

                ctrl.setAccount = function setAccount(result) {
                    ctrl.myAccount = result;
                    ctrl.myAccount.gender = ctrl.genders.find(function find(obj){
                        return obj.code === ctrl.myAccount.gender;
                    });
                    if(ctrl.myAccount.phonetype){
                        ctrl.myAccount.phonetype = ctrl.phoneTypes.find(function find(obj){
                            return obj.code === ctrl.myAccount.phonetype;
                        });
                    };
                    ctrl.dateSelected.value = ctrl.myAccount.dateOfBirth;
                };
                ctrl.onCatchAccount = function onCatchAccount() {};

                ctrl.getAccount = function getAccount() {
                    ctrl.isLoading = true;
                    MyAccount.get().$promise
                        .then(ctrl.setAccount)
                        .catch(ctrl.onCatchAccount)
                        .finally(ctrl.setView);
                };

                ctrl.setDateJSON = function setDateJSON() {
                    var auxDate = ctrl.dateSelected.value.toJSON().split('T');
                    auxDate[1] = '00:00:00';
                    ctrl.myAccount.dateOfBirth = auxDate.join('T');
                };

                ctrl.save = function save() {
                    ctrl.setDateJSON();
                    if (ctrl.validate()) {
                        ctrl.myAccount.gender = ctrl.myAccount.gender.code;
                        ctrl.myAccount.phonetype = ctrl.myAccount.phonetype.code;
                        ctrl.myAccount.id ? ctrl.update() : ctrl.createNew();
                    }
                };

                ctrl.createNew = function createNew() {
                    ctrl.isLoading = true;
                    MyAccount.save(ctrl.myAccount).$promise
                        .then(ctrl.onThenNew)
                        .finally(ctrl.onFinallySave);
                };

                ctrl.onFinallySave = function onFinally(result) {
                    ctrl.isLoading = false;
                    ctrl.alert.show = true;
                    ctrl.alert.message = $translate.instant(result ? 'global.message.saveSuccess' : 'global.message.saveError');
                    ctrl.alert.type = result ? 'alert-success' : 'alert-danger';
                }

                ctrl.onThenNew = function onThenNew(res) {
                    scope.go('/users-offers');
                };

                ctrl.update = function update() {
                    ctrl.isLoading = true;
                    MyAccount.update(ctrl.myAccount).$promise
                        .then(function onThen(res) {})
                        .finally(ctrl.onFinallySave);
                };

                ctrl.cancel = function () {

                    $state.go(ctrl.myAccount.id ? '/users-offers' : '/login');
                };

                ctrl.validate = function validate() {
                    var validations = true;
                    ctrl.validateError.show.firstName = !ctrl.myAccount.firstname;
                    ctrl.validateError.show.lastName = !ctrl.myAccount.lastname;
                    ctrl.validateError.show.nickName = !ctrl.myAccount.account.nickname;
                    ctrl.validateError.show.dateOfBirth = !ctrl.myAccount.dateOfBirth;
                    ctrl.validateError.show.gender = !ctrl.myAccount.gender;
                    ctrl.validateError.show.nationality = !ctrl.myAccount.countryofbirth;
                    ctrl.validateError.show.countryOfResidence = !ctrl.myAccount.countryofresidence;
                    ctrl.validateError.show.city = !ctrl.myAccount.cityofresidence;
                    ctrl.validateError.show.email = !ctrl.myAccount.account.mail;
                    ctrl.validateError.show.password = !ctrl.myAccount.account.password;
                    ctrl.validateError.show.emailConfirm = !ctrl.emailConfirm || ctrl.myAccount.account.mail !== ctrl.emailConfirm;
                    ctrl.validateError.show.passwordConfirm = !ctrl.passwordConfirm || ctrl.myAccount.account.password !== ctrl.passwordConfirm;
                    for (const prop in ctrl.validateError.show) {
                        if (ctrl.validateError.show[prop]) {
                            validations = false;
                            break;
                        }
                    }

                    return validations;
                };

                ctrl.isLoadingOptions = function isLoadingOptions() {
                    ctrl.isLoading = ctrl.isLoadingAccount || ctrl.isLoadingCountries || ctrl.isLoadingCities;
                }

                ctrl.init();
            }
        ]);
})(angular);