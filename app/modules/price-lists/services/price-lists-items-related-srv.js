(function RelatedItemsScope(application) {
    'use strict';
    application.app.lazy.service('RelatedItems', ['$resource', function RelatedItems($resource) {
       return $resource('/api/samba-esales/v1/price-lists/items/:id/related?count=:count', { id: '@id', count:'@count' });
    }
    ]);
})(window.application);
