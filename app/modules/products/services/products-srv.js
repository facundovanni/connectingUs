(function ProductsScope(application) {
  'use strict';
  application.app.lazy.service('Products', ['$resource', function Products($resource) {
    return $resource('/api/samba-esales/v1/products/:id', {id: '@id'});
  }
  ]);
})(window.application);
