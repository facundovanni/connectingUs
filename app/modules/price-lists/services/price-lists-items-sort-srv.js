(function priceListsItemsSortScope(application) {
    'use strict';
    application.app.lazy.service('priceListsItemsSort', ['localStorageStore', function priceListsItemsSort(localStorageStore) {
        var key = 'esales-price-list-', sortingOptions = ['PriceLists.sorting.lowerPrice', 'PriceLists.sorting.higherPrice', 'PriceLists.sorting.moreRelevant'];

        function getSort(clientId) {
            var savedStore = localStorageStore.getLocalStore(key, clientId);
            if (savedStore) {
                return JSON.parse(savedStore).sortingSelected;
            } else {
                var store = localStorageStore.createBlankStore();
                store.sortingSelected = sortingOptions[0];
                localStorageStore.saveLocalStore(key, clientId, store);
                return store.sortingSelected;
            }

        }

        function setSort(clientId, option) {
            var savedStore = localStorageStore.getLocalStore(key, clientId);
            var store = savedStore ? JSON.parse(savedStore) : localStorageStore.createBlankStore();
            store.sortingSelected = option;
            localStorageStore.saveLocalStore(key, clientId, store);

        }
        return {
            getSort: getSort,
            sortingOptions: sortingOptions,
            setSort: setSort
        };
    }]);
})(window.application);
