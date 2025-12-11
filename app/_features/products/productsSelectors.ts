import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../_store';

const selectProductsState = (state: RootState) => state.products;

export const selectProducts = createSelector(
  [selectProductsState],
  productsState => productsState.products
);

export const selectProductsLoading = createSelector(
  [selectProductsState],
  productsState => productsState.isLoading
);

export const selectProductsLoadingMore = createSelector(
  [selectProductsState],
  productsState => productsState.isLoadingMore
);

export const selectProductsRefreshing = createSelector(
  [selectProductsState],
  productsState => productsState.isRefreshing
);

export const selectProductsError = createSelector(
  [selectProductsState],
  productsState => productsState.error
);

export const selectPagination = createSelector(
  [selectProductsState],
  productsState => productsState.pagination
);

export const selectHasMore = createSelector(
  [selectPagination],
  pagination => pagination.hasMore
);

export const selectFilters = createSelector(
  [selectProductsState],
  productsState => productsState.filters
);

export const selectSortBy = createSelector(
  [selectProductsState],
  productsState => productsState.sortBy
);

export const selectSearchQuery = createSelector(
  [selectProductsState],
  productsState => productsState.searchQuery
);

export const selectActiveFiltersCount = createSelector(
  [selectFilters],
  filters => filters.categories.length
);

export const selectIsFiltered = createSelector(
  [selectFilters, selectSearchQuery],
  (filters, searchQuery) =>
    filters.categories.length > 0 || searchQuery.length > 0
);
