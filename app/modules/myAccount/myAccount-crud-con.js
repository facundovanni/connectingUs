(function MateriaGridScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.myAccount')
        .controller('myAccountCRUDController', ['$scope', 'MyAccount', '$translate',
            function ($scope, MyAccount, $translate) {
                var ctrl = this;
                ctrl.validateError = {
                    text: 'Campo requerido'
                };

                ctrl.fillArrays = function fillArrays() {
                    ctrl.genders=[$translate.instant('global.gender.male'),$translate.instant('global.gender.female'),$translate.instant('global.gender.other')];
                }
                ctrl.myAccount = MyAccount.getDefaultEntity();

                ctrl.myAccount._id = undefined;

                ctrl.init = function init() {
                    ctrl.fillArrays();
                    if (ctrl.myAccount._id) {
                        ctrl.title = 'My Account';
                        ctrl.setMateria();
                        ctrl.setEdit(false);
                    } else {
                        ctrl.title = $translate.instant('myAccount.titleSignUp');
                        ctrl.setEdit(true);
                    }
                };

                ctrl.setEdit = function setEdit(boolean) {
                    ctrl.disabled = !boolean;
                    ctrl.isEditing = boolean;
                };

                ctrl.setMateria = function setMateria() {
                    ctrl.isLoading = true;
                    MyAccount.get({ id: ctrl.myAccount._id }).$promise.then(function onThen(res) {
                        ctrl.myAccount = res;
                    }).finally(function onFinally() {
                        ctrl.isLoading = false;
                    });
                };

                ctrl.save = function save() {
                    if (ctrl.validate()) {
                        ctrl.myAccount._id ? ctrl.update() : ctrl.createNew();
                    }
                };

                ctrl.createNew = function createNew() {
                    ctrl.isLoading = true;
                    MyAccount.save(ctrl.myAccount).$promise.then(function onThen(res) {
                        ctrl.modalInstance.close();
                    });
                    ctrl.isLoading = false;
                }

                ctrl.update = function update() {
                    ctrl.isLoading = true;
                    MyAccount.update(ctrl.myAccount).$promise.then(function onThen(res) {
                        ctrl.modalInstance.close();
                    });
                    ctrl.isLoading = false;
                }

                ctrl.delete = function update() {
                    MyAccount.remove([{ _id: ctrl.myAccount._id }]).$promise.then(function onThen(res) {
                        ctrl.modalInstance.close();
                    })
                }

                ctrl.cancel = function () {
                    ctrl.modalInstance.dismiss();
                };

                ctrl.validate = function validate() {
                    return ctrl.validateCode() && ctrl.validateName() && ctrl.validateDivision() && ctrl.validateYear();
                };

                ctrl.validateCode = function validateCode() {
                    return !(ctrl.validateError.abreviatura = !ctrl.myAccount.abreviatura);
                };
                ctrl.validateName = function validateName() {
                    return !(ctrl.validateError.name = !ctrl.myAccount.name);
                };

                ctrl.validateYear = function validateYear() {
                    return !(ctrl.validateError.year = !ctrl.myAccount.year);
                };
                ctrl.validateDivision = function validateDivision() {
                    return !(ctrl.validateError.division = !ctrl.myAccount.division);
                };


                ctrl.init();
            }
        ]);
})(angular);