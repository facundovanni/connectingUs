(function MateriaGridScope(angular) {
  'use strict';

  angular.module('connectingUsCenter.myAccount').controller('MateriasGridController', ['$scope', 'MyAccount', '$state', '$uibModal','isLogged',
    function ($scope, MyAccount, $state, $uibModal, isLogged) {
      var that = this;

      that.init = function init() {
        if(that.setLogged()){
          that.getMaterias();
        };
        
      };

      that.getMaterias = function getMaterias() {
        that.isLoading = true;
        MyAccount.grid().$promise.then(function (res) {
          that.data = res;
          that.setGrid();
        }).finally(function onFinally() {
          that.isLoading = false;
        });
      };

      that.setGrid = function setGrid() {
        that.grid = {
          enableRowSelection: true,
          enableRowHeaderSelection: false,
          enableSorting: true,
          enableFiltering: true,
          enableGridMenu: true,
          rowTemplate: "<div ng-dblclick=\"grid.appScope.ctrl.openCRUD(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",
          columnDefs: [{
            name: 'Código',
            field: 'abreviatura',
            width: '100'
          }, {
            name: 'Nombre',
            field: 'name'
          }],
          data: that.data
        };
        that.showGrid = true;
      };

      that.modalInstance = {
        templateUrl: 'modules/myAccount/myAccount-crud.html',
        controller: 'myAccountCRUDController as ctrl',
        size: 'md'
      };

      that.openCRUD = function openCRUD(grid, row) {
        that.modalInstance.resolve = {
          materiaId: function getMateriaId() {
            return row ? row.entity._id : undefined;
          }
        };

        $uibModal.open(that.modalInstance).result.then(function success() {
          that.getMaterias();
        });
      };
      that.setLogged = function setLogged() {
        that.isLogged = isLogged();
        if (!that.isLogged) {
          $state.go('login-login');
        }
        return that.isLogged;
      };

      that.init();
    }
  ]);
})(angular);