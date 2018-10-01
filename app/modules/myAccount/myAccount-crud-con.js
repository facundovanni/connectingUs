(function MyAccountCRUDScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.myAccount')
        .controller('myAccountCRUDController', ['$scope', 'MyAccount', '$translate',
            function ($scope, MyAccount, $translate) {
                var ctrl = this;

                ctrl.validateError = {
                    text: $translate.instant('global.error.textRequired'),
                    emailConfirm: $translate.instant('myAccount.error.emailConfirm'),
                    passwordConfirm: $translate.instant('myAccount.error.passwordConfirm')
                };

                ctrl.fillArrays = function fillArrays() {
                    ctrl.genders = [$translate.instant('global.gender.male'), $translate.instant('global.gender.female'), $translate.instant('global.gender.other')];
                };

                ctrl.myAccount = MyAccount.getDefaultEntity();

                ctrl.init = function init() {
                    ctrl.fillArrays();
                    ctrl.getAccount();
                };

                ctrl.setView = function setView() {
                    ctrl.title = ctrl.myAccount.id ? $translate.instant('myAccount.title') : $translate.instant('myAccount.titleSignUp');
                };

                ctrl.setEdit = function setEdit(boolean) {
                    ctrl.disabled = !boolean;
                };

                ctrl.getAccount = function getAccount() {
                    ctrl.isLoading = true;
                    MyAccount.get().$promise.then(function onThen(result) {
                        ctrl.myAccount = result;
                    }).catch(function onCatch(){

                    }).finally(function onFinally() {
                        ctrl.setView();
                        ctrl.isLoading = false;
                    });
                };

                ctrl.save = function save() {
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
                    $state.go();
                };

                ctrl.valGeneral = function valGeneral() {
                    return ctrl.valFirstName() && ctrl.valLastName() && ctrl.valNickName() && ctrl.valDayOfBirth() && ctrl.valGender() && ctrl.valNationality() && ctrl.valCountry() && ctrl.valCity();
                };

                ctrl.valAccount = function valAccount() {
                    return ctrl.valEmail() && ctrl.valEmailConfirm() && ctrl.valPassword() && ctrl.valPasswordConfirm();
                };

                ctrl.validate = function validate() {
                    return ctrl.valGeneral() && ctrl.valAccount();
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
                    return !(ctrl.validateError.dayOfBirth = !ctrl.myAccount.dayOfBirth);
                };

                ctrl.valGender = function valGender() {
                    return !(ctrl.validateError.gender = !ctrl.myAccount.selectedGender);
                };

                ctrl.valNationality = function valNationality() {
                    return !(ctrl.validateError.nationality = !ctrl.myAccount.nationality);
                };

                ctrl.valCountry = function valCountry() {
                    return !(ctrl.validateError.country = !ctrol.myAccount.country);
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
                
                ctrl.init();
            }
        ]);
})(angular);