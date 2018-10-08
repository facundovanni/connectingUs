(function PriceListsItemsFiltersScope(application) {
  'use strict';
  application.app.lazy.service('PriceListsItemsFilters', ['$resource', function PriceListsItemsFilters($resource) {
    return $resource('/api/samba-esales/v1/price-lists/filters');
  }
  ]);
})(window.application);
