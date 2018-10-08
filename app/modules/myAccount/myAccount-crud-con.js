(function MyAccountCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.myAccount')
        .controller('myAccountCRUDController', ['MyAccount', '$translate', '$state', 'Countries',
            function (MyAccount, $translate, $state, Countries) {
                var ctrl = this;
                ctrl.today = new Date();
                ctrl.validateError = {
                    text: $translate.instant('global.error.textRequired'),
                    emailConfirm: $translate.instant('myAccount.error.emailConfirm'),
                    passwordConfirm: $translate.instant('myAccount.error.password'),
                    email: $translate.instant('myAccount.error.email'),
                    passwordConfirm: $translate.instant('myAccount.error.password'),
                };

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
                    ctrl.genders = [
                        {
                            code: 'M',
                            description: $translate.instant('global.gender.male')
                        }, {
                            code: 'F',
                            description: $translate.instant('global.gender.female')
                        }
                    ];
                    ctrl.isLoadingCountries = true;
                    ctrl.isLoadingOptions();
                    Countries.get().$promise
                        .then(ctrl.setCountries)
                        .catch(ctrl.onCatchAccount)
                        .finally(ctrl.onFinallyCountries);
                };

                ctrl.setCountries = function setCountries(result) {
                    ctrl.countries = result;
                };
                ctrl.onFinallyCountries = function onFinallyCountries() {
                    ctrl.isLoadingCountries = false;
                    ctrl.isLoadingOptions();
                }

                ctrl.myAccount = MyAccount.getDefaultEntity();

                ctrl.init = function init() {
                    ctrl.fillArrays();
                    ctrl.getAccount();
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
                    ctrl.dateSelected.value = ctrl.myAccount.dateOfBirth;
                };
                ctrl.onCatchAccount = function onCatchAccount() { };

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
                        ctrl.myAccount.id ? ctrl.update() : ctrl.createNew();
                    }
                };

                ctrl.createNew = function createNew() {
                    ctrl.isLoading = true;
                    MyAccount.save(ctrl.myAccount).$promise.then(function onThen(res) {
                        ctrl.isLoading = false;
                    });
                };

                ctrl.update = function update() {
                    ctrl.isLoading = true;
                    MyAccount.update(ctrl.myAccount).$promise.then(function onThen(res) {
                        ctrl.isLoading = false;
                    });
                };

                ctrl.cancel = function () {
                    $state.go('users-offers');
                };

                ctrl.valGeneral = function valGeneral() {
                    return ctrl.valFirstName() && ctrl.valLastName() && ctrl.valNickName() && ctrl.valDayOfBirth() && ctrl.valGender() && ctrl.valNationality() && ctrl.valCountry() && ctrl.valCity();
                };

                ctrl.valAccount = function valAccount() {
                    return ctrl.valEmail() && ctrl.valEmailConfirm() && ctrl.valPassword() && ctrl.valPasswordConfirm();
                };

                ctrl.validate = function validate() {
                    return ctrl.valAccount();
                }

                ctrl.valFirstName = function valFirstName() {
                    return !(ctrl.validateError.firstName = !ctrl.myAccount.firstName);
                };

                ctrl.valLastName = function valLastName() {
                    return !(ctrl.validateError.lastName = !ctrl.myAccount.lastName);
                };

                ctrl.valNickName = function valNickName() {
                    return !(ctrl.validateError.nickName = !ctrl.myAccount.nickName);
                };

                ctrl.valDayOfBirth = function valDayOfBirth() {
                    return !(ctrl.validateError.dateOfBirth = !ctrl.myAccount.dateOfBirth);
                };

                ctrl.valGender = function valGender() {
                    return !(ctrl.validateError.gender = !ctrl.myAccount.gender);
                };

                ctrl.valNationality = function valNationality() {
                    return !(ctrl.validateError.nationality = !ctrl.myAccount.nationality);
                };

                ctrl.valCountry = function valCountry() {
                    return !(ctrl.validateError.countryOfResidence = !ctrol.myAccount.countryOfResidence);
                };

                ctrl.valCity = function valCity() {
                    return !(ctrl.validateError.city = !ctrl.myAccount.city);
                };

                ctrl.valEmail = function valEmail() {
                    return !(ctrl.validateError.email = !ctrl.myAccount.email);
                };

                ctrl.valEmailConfirm = function valEmailConfirm() {
                    if (ctrl.emailConfirm) {
                        if (ctrl.myAccount.email !== ctrl.myAccount.emailConfirm) {
                            ctrl.showEmailConfirmError = true;
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }

                };

                ctrl.valPassword = function valPassword() {
                    return !(ctrl.validateError.password = !ctrl.myAccount.password);
                };

                ctrl.valPasswordConfirm = function valPasswordConfirm() {
                    if (ctrl.passwordConfirm) {
                        if (ctrl.myAccount.password !== ctrl.myAccount.passwordConfirm) {
                            ctrl.showPasswordConfirmError = true;
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }

                };

                ctrl.isLoadingOptions = function isLoadingOptions() {
                    ctrl.isLoading = ctrl.isLoadingAccount || ctrl.isLoadingCountries;
                }

                ctrl.init();
            }
        ]);
})(angular);