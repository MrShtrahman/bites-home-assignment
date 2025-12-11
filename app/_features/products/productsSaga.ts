import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, select, takeLatest } from 'redux-saga/effects';
import { mockApi } from '../../_shared/mockApi';
import { ApiResponse, Product } from '../../_shared/types';
import { RootState } from '../../_store';
import {
  clearCategoryFilters,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  setSearchQuery,
  setSortBy,
  toggleCategoryFilter
} from './productsSlice';
import { FetchProductsPayload, ProductsState } from './types';

const fetchProductsSaga = function* (
  action: PayloadAction<FetchProductsPayload>
) {
  const { page, limit, append } = action.payload;

  const state: RootState = yield select();
  const { filters, sortBy, searchQuery } = state.products as ProductsState;

  const response: ApiResponse<Product[]> = yield call(mockApi.fetchProducts, {
    page,
    limit,
    searchQuery: searchQuery ?? undefined,
    categories: filters.categories.length > 0 ? filters.categories : undefined,
    sortBy
  });

  if (response.error) {
    yield put(fetchProductsFailure(response.error));
    return;
  }

  yield put(
    fetchProductsSuccess({
      products: response.data,
      pagination: response.pagination!,
      append
    })
  );
};

const refetchProductsOnFilterChange = function* () {
  yield put(fetchProductsRequest({ page: 1, limit: 20 }));
};

export const productsSaga = function* () {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  yield takeLatest(toggleCategoryFilter.type, refetchProductsOnFilterChange);
  yield takeLatest(clearCategoryFilters.type, refetchProductsOnFilterChange);
  yield takeLatest(setSortBy.type, refetchProductsOnFilterChange);
  // I want some delay here for user "abuse" of the search bar
  yield debounce(300, setSearchQuery.type, refetchProductsOnFilterChange);
};
