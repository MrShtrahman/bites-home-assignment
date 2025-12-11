export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  stock: number;
  createdAt: string;
}

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing',
  FOOD = 'Food',
  SPORTS = 'Sports',
  TOYS = 'toys'
}

export enum SortOption {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  RATING_DESC = 'rating_desc',
  NAME_ASC = 'name_asc',
  NEWEST = 'newest'
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationMeta;
  error?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
