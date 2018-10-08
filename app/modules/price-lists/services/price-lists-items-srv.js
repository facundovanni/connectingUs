(function PriceListsItemsScope(application) {
  'use strict';
  application.app.lazy.service('PriceListsItems', ['$resource', function PriceListsItems($resource) {
    return $resource('/api/samba-esales/v1/price-lists/items/:id', { id: '@id' });
  }
  ]);
})(window.application);
