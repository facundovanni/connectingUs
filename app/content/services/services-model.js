(function ServicesModelScope(angular) {
  'use strict';

  angular.module('connectingUsCenter.services', [])
    .service('ServicesModel', ServicesModel);

  ServicesModel.$inject = ['$resource', '__env'];

  function ServicesModel($resource, __env) {

    this.create = function create(url, customParams, customActions) {
      var actions = angular.extend({
        get: {
          method: 'GET',
        },
        update: {
          method: 'PUT'
        },
        query: {
          method: 'GET',
          isArray: true
        },
        saveNew: {
          method: 'POST'
        },
        remove: {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          hasBody: true

        }
      }, this.setCustomActions(customActions));

      var params = angular.extend({}, customParams);
      var resource = $resource(__env.apiUrl + url, params, actions);

      resource.getById = function getById(id) {
        return resource.get({
          id: id
        });
      };

      resource.save = function save(obj) {
        return obj.Id ? resource.update(obj) : resource.saveNew(obj);
      };

      return resource;
    };

    this.setCustomActions = function setCustomActions(customActions) {
      for (const prop in customActions) {
        if (customActions[prop].url) {
          customActions[prop].url = __env.apiUrl + customActions[prop].url;
        }
      }
      return customActions;
    }
  }
})(window.angular);
