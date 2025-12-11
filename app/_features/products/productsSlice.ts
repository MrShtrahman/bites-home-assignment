import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    PaginationMeta,
    Product,
    ProductCategory,
    SortOption
} from '../../_shared/types';
import { FetchProductsPayload, ProductsState } from './types';

const initialState: ProductsState = {
  products: [],
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    hasMore: true
  },
  filters: {
    categories: []
  },
  sortBy: SortOption.NEWEST,
  searchQuery: '',
  isLoading: false,
  isLoadingMore: false,
  isRefreshing: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (
      state,
      action: PayloadAction<FetchProductsPayload>
    ) => {
      if (action.payload.refresh) {
        state.isRefreshing = true;
      } else if (action.payload.append) {
        state.isLoadingMore = true;
      } else {
        state.isLoading = true;
      }
      state.error = null;
    },

    fetchProductsSuccess: (
      state,
      action: PayloadAction<{
        products: Product[];
        pagination: PaginationMeta;
        append?: boolean;
      }>
    ) => {
      const { products, pagination, append } = action.payload;

      if (append) {
        state.products = [...state.products, ...products];
      } else {
        state.products = products;
      }

      state.pagination = pagination;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.isRefreshing = false;
      state.error = null;
    },

    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLoadingMore = false;
      state.isRefreshing = false;
      state.error = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.pagination.currentPage = 0;
    },

    toggleCategoryFilter: (state, action: PayloadAction<ProductCategory>) => {
      const category = action.payload;
      const index = state.filters.categories.indexOf(category);

      if (index > -1) {
        state.filters.categories = state.filters.categories.filter(
          c => c !== category
        );
      } else {
        state.filters.categories.push(category);
      }

      state.pagination.currentPage = 0;
    },

    clearCategoryFilters: state => {
      state.filters.categories = [];
      state.pagination.currentPage = 0;
    },

    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.pagination.currentPage = 0;
    },

    resetProducts: () => initialState
  }
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSearchQuery,
  toggleCategoryFilter,
  clearCategoryFilters,
  setSortBy,
  resetProducts
} = productsSlice.actions;

export default productsSlice.reducer;
