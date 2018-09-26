(function MateriaGridScope(angular) {
    'use strict';

    angular.module('connectingUsCenter.materia').controller('MateriasCRUDController', ['$scope', 'Materias', '$uibModalInstance', 'materiaId',
        function ($scope, Materias, $uibModalInstance, materiaId) {
            var that = this;
            that.validateError = {
                text: 'Campo requerido'
            };
            that.modalInstance = $uibModalInstance;

            that.materia = Materias.getDefaultEntity();

            that.materia._id = materiaId;

            that.init = function init() {
                if (that.materia._id) {
                    that.title = 'Consulta de materia';
                    that.setMateria();
                    that.setEdit(false);
                } else {
                    that.title = 'Alta de materia';
                    that.setEdit(true);
                }
            };

            that.setEdit = function setEdit(boolean) {
                that.disabled = !boolean;
                that.isEditing = boolean;
            };

            that.setMateria = function setMateria() {
                that.isLoading = true;
                Materias.get({id: that.materia._id}).$promise.then(function onThen(res) {
                    that.materia = res;
                }).finally(function onFinally() {
                    that.isLoading = false;
                });
            };

            that.save = function save() {
                if (that.validate()) {
                    that.materia._id ? that.update() : that.createNew();
                }
            };

            that.createNew = function createNew() {
                that.isLoading = true;
                Materias.save(that.materia).$promise.then(function onThen(res) {
                    that.modalInstance.close();
                });
                that.isLoading = false;
            }

            that.update = function update() {
                that.isLoading = true;
                Materias.update(that.materia).$promise.then(function onThen(res) {
                    that.modalInstance.close();
                });
                that.isLoading = false;
            }

            that.delete = function update() {
                Materias.remove([{ _id: that.materia._id }]).$promise.then(function onThen(res) {
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
                return !(that.validateError.abreviatura = !that.materia.abreviatura);
            };
            that.validateName = function validateName() {
                return !(that.validateError.name = !that.materia.name);
            };

            that.validateYear = function validateYear() {
                return !(that.validateError.year = !that.materia.year);
            };
            that.validateDivision = function validateDivision() {
                return !(that.validateError.division = !that.materia.division);
            };
            

            that.init();
        }
    ]);
})(angular);