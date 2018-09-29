(function MateriaGridScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.myAccount').controller('myAccountCRUDController', ['$scope', 'MyAccount', '$uibModalInstance', 'materiaId',
        function ($scope, MyAccount, $uibModalInstance, materiaId) {
            var that = this;
            that.validateError = {
                text: 'Campo requerido'
            };
            that.modalInstance = $uibModalInstance;

            that.myAccount = MyAccount.getDefaultEntity();

            that.myAccount._id = materiaId;

            that.init = function init() {
                if (that.myAccount._id) {
                    that.title = 'Consulta de myAccount';
                    that.setMateria();
                    that.setEdit(false);
                } else {
                    that.title = 'Alta de myAccount';
                    that.setEdit(true);
                }
            };

            that.setEdit = function setEdit(boolean) {
                that.disabled = !boolean;
                that.isEditing = boolean;
            };

            that.setMateria = function setMateria() {
                that.isLoading = true;
                MyAccount.get({id: that.myAccount._id}).$promise.then(function onThen(res) {
                    that.myAccount = res;
                }).finally(function onFinally() {
                    that.isLoading = false;
                });
            };

            that.save = function save() {
                if (that.validate()) {
                    that.myAccount._id ? that.update() : that.createNew();
                }
            };

            that.createNew = function createNew() {
                that.isLoading = true;
                MyAccount.save(that.myAccount).$promise.then(function onThen(res) {
                    that.modalInstance.close();
                });
                that.isLoading = false;
            }

            that.update = function update() {
                that.isLoading = true;
                MyAccount.update(that.myAccount).$promise.then(function onThen(res) {
                    that.modalInstance.close();
                });
                that.isLoading = false;
            }

            that.delete = function update() {
                MyAccount.remove([{ _id: that.myAccount._id }]).$promise.then(function onThen(res) {
                    that.modalInstance.close();
                })
            }

            that.cancel = function () {
                that.modalInstance.dismiss();
            };

            that.validate = function validate() {
                return that.validateCode() && that.validateName() && that.validateDivision() && that.validateYear();
            };

            that.validateCode = function validateCode() {
                return !(that.validateError.abreviatura = !that.myAccount.abreviatura);
            };
            that.validateName = function validateName() {
                return !(that.validateError.name = !that.myAccount.name);
            };

            that.validateYear = function validateYear() {
                return !(that.validateError.year = !that.myAccount.year);
            };
            that.validateDivision = function validateDivision() {
                return !(that.validateError.division = !that.myAccount.division);
            };
            

            that.init();
        }
    ]);
})(angular);