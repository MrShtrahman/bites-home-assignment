import {
  LoadingState,
  PaginationMeta,
  Product,
  ProductCategory,
  SortOption
} from '../../_shared/types';

export interface ProductsState extends LoadingState {
  products: Product[];
  pagination: PaginationMeta;
  filters: ProductFilters;
  sortBy: SortOption;
  searchQuery: string;
  isLoadingMore: boolean;
  isRefreshing: boolean;
}

export interface ProductFilters {
  categories: ProductCategory[];
}

export interface FetchProductsPayload {
  page: number;
  limit: number;
  append?: boolean;
  refresh?: boolean;
}
