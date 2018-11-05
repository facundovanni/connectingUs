(function MyAccountCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.myAccount')
        .controller('myAccountCRUDController', ['MyAccount', '$translate', '$state', 'Countries', 'Cities', '$stateParams',
            function (MyAccount, $translate, $state, Countries, Cities, $stateParams) {
                var ctrl = this;
                ctrl.userId = $stateParams.Id;
                ctrl.today = new Date();
                ctrl.modalVisible = false;
                ctrl.termsAndConditionsChecked = false;
                ctrl.validateError = {
                    show: {},
                    message: {
                        phoneNumber: $translate.instant('myAccount.error.phoneNumber'),
                        text: $translate.instant('global.error.textRequired'),
                        emailConfirm: $translate.instant('myAccount.error.emailConfirm'),
                        passwordConfirm: $translate.instant('myAccount.error.passwordConfirm'),
                        email: $translate.instant('myAccount.error.email'),
                        password: $translate.instant('myAccount.error.password'),
                        termsAndConditions: $translate.instant('myAccount.error.termsAndConditions'),
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

                ctrl.showModal = function showModal(state){
                    ctrl.modalVisible = state;
                }

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
                    ctrl.phoneTypes = [
                        { code: 'M', description: $translate.instant('global.phoneType.mobile') },
                        { code: 'H', description: $translate.instant('global.phoneType.home') },
                        { code: 'O', description: $translate.instant('global.phoneType.other') }
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

                ctrl.onChangeCountries = function onChangeCountries(item) {
                    if (ctrl.myAccount.CountryOfResidence.Id) {
                        ctrl.getCities();
                    }
                };

                ctrl.getCities = function getCities(){
                    ctrl.isLoadingCities = true;
                    ctrl.isLoadingOptions();
                    Cities.getAll({ idCountry: ctrl.myAccount.CountryOfResidence.Id }).$promise
                        .then(ctrl.setCities)
                        .finally(ctrl.onFinallyCities);
                }

                ctrl.setCities = function setCities(result) {
                    ctrl.cities = result;

                };
                ctrl.onFinallyCities = function onFinallyCountries() {
                    ctrl.isLoadingCities = false;
                    ctrl.isLoadingOptions();
                };


                ctrl.setView = function setView() {
                    ctrl.title = ctrl.myAccount.Id ? $translate.instant('myAccount.title') : $translate.instant('myAccount.titleSignUp');
                    ctrl.isLoadingAccount = false;
                    ctrl.isLoadingOptions();
                };

                ctrl.setEdit = function setEdit(boolean) {
                    ctrl.disabled = !boolean;
                };

                ctrl.setAccount = function setAccount(result) {
                    ctrl.myAccount = result;
                    ctrl.myAccount.Gender = ctrl.genders.find(function find(obj) {
                        return obj.code === ctrl.myAccount.Gender;
                    });
                    if (ctrl.myAccount.PhoneType) {
                        ctrl.myAccount.PhoneType = ctrl.phoneTypes.find(function find(obj) {
                            return obj.code === ctrl.myAccount.PhoneType;
                        });
                    };
                    ctrl.getCities();
                    ctrl.dateSelected.value = new Date(ctrl.myAccount.DateOfBirth);
                };
                ctrl.onCatchAccount = function onCatchAccount(res) {
                    console.log(res);
                };

                ctrl.getAccount = function getAccount() {
                    ctrl.isLoading = true;
                    ctrl.myAccount.Id = ctrl.userId ? ctrl.userId : undefined;
                    if (ctrl.myAccount.Id) {
                        MyAccount.get({Id: ctrl.myAccount.Id}).$promise
                            .then(ctrl.setAccount)
                            .catch(ctrl.onCatchAccount)
                            .finally(ctrl.setView);
                    }else{
                        ctrl.setView();
                    }
                };

                ctrl.setDateJSON = function setDateJSON() {
                    var auxDate = ctrl.dateSelected.value.toJSON().split('T');
                    auxDate[1] = '00:00:00';
                    ctrl.myAccount.DateOfBirth = auxDate.join('T');
                };

                ctrl.save = function save() {
                    ctrl.setDateJSON();
                    if (ctrl.validate()) {
                        ctrl.myAccount.Gender = ctrl.myAccount.Gender.code;
                        ctrl.myAccount.PhoneType = ctrl.myAccount.PhoneType ? ctrl.myAccount.PhoneType.code : undefined;
                        ctrl.myAccount.Id = ctrl.myAccount.Id ?  ctrl.myAccount.Id : undefined;
                        ctrl.saveData();
                    }
                };

                ctrl.saveData = function saveData() {
                    ctrl.isLoading = true;
                    MyAccount.save(ctrl.myAccount).$promise
                        .then(ctrl.onThenNew)
                        .finally(ctrl.onFinallySave);
                };

                ctrl.onFinallySave = function onFinally(result) {
                    ctrl.isLoading = false;
                }

                ctrl.onThenNew = function onThenNew(res) {
                    ctrl.alert.show = true;
                    ctrl.alert.message = $translate.instant(result ? 'global.message.saveSuccess' : 'global.message.saveError');
                    ctrl.alert.type = result ? 'alert-success' : 'alert-danger';
                    $state.go('/offers');
                };

                ctrl.cancel = function () {
                    $state.go(ctrl.myAccount.Id ? '/offers' : '/login');
                };

                ctrl.validate = function validate() {
                    ctrl.hasValidated = false;
                    var validations = true;
                    ctrl.validateError.show.email = !ctrl.myAccount.Account.Mail || ctrl.myAccount.Account.Mail.indexOf('.') === -1;
                    ctrl.validateError.show.emailConfirm = !ctrl.emailConfirm || ctrl.myAccount.Account.Mail !== ctrl.emailConfirm;
                    ctrl.validateError.show.passwordConfirm = !ctrl.passwordConfirm || ctrl.myAccount.Account.Password !== ctrl.passwordConfirm;
                    //ctrl.validateError.show.termsAndConditions = !ctrl.termsAndConditionsChecked;
                    for (const prop in ctrl.validateError.show) {
                        if (ctrl.validateError.show[prop]) {
                            validations = false;
                            break;
                        }
                    }
                    ctrl.hasValidated = true;
                    return validations;
                };

                ctrl.isLoadingOptions = function isLoadingOptions() {
                    ctrl.isLoading = ctrl.isLoadingAccount || ctrl.isLoadingCountries || ctrl.isLoadingCities;
                }

                ctrl.init();
            }
        ]);
})(angular);