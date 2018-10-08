(function PriceListsScope(application) {
  'use strict';
  application.app.lazy.service('PriceLists', ['$resource', function PriceLists($resource) {
    return $resource('/api/samba-esales/v1/price-lists/:id', { id: '@id' });
  }
  ]);
})(window.application);
