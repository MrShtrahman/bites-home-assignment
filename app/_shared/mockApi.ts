import { MOCK_PRODUCTS } from './mockData';
import {
  ApiResponse,
  PaginationMeta,
  PaginationParams,
  Product,
  ProductCategory,
  SortOption
} from './types';

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case SortOption.PRICE_ASC:
      return sorted.sort((a, b) => a.price - b.price);
    case SortOption.PRICE_DESC:
      return sorted.sort((a, b) => b.price - a.price);
    case SortOption.RATING_DESC:
      return sorted.sort((a, b) => b.rating - a.rating);
    case SortOption.NAME_ASC:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case SortOption.NEWEST:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return sorted;
  }
};

const filterProducts = (
  products: Product[],
  searchQuery?: string,
  categories?: ProductCategory[]
): Product[] => {
  let filtered = [...products];

  if (searchQuery?.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query)
    );
  }

  if (categories?.length) {
    filtered = filtered.filter(({ category }) => categories.includes(category));
  }

  return filtered;
};

interface FetchProductsParams extends PaginationParams {
  searchQuery?: string;
  categories?: ProductCategory[];
  sortBy?: SortOption;
}

export const mockApi = {
  fetchProducts: async (
    params: FetchProductsParams
  ): Promise<ApiResponse<Product[]>> => {
    await delay(800);

    const {
      page,
      limit,
      searchQuery,
      categories,
      sortBy = SortOption.NEWEST
    } = params;

    let filtered = filterProducts(MOCK_PRODUCTS, searchQuery, categories);
    filtered = sortProducts(filtered, sortBy);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit);

    const pagination: PaginationMeta = {
      currentPage: page,
      totalPages,
      totalItems,
      hasMore: page < totalPages
    };

    return { data: paginatedProducts, pagination };
  },

  fetchProductById: async (id: string): Promise<ApiResponse<Product>> => {
    await delay(800);

    const product = MOCK_PRODUCTS.find(p => p.id === id);

    if (!product) {
      return {
        data: {} as Product,
        error: 'Product not found'
      };
    }

    return { data: product };
  },

  placeOrder: async (orderData: {
    items: { productId: string; quantity: number }[];
    totalAmount: number;
  }): Promise<ApiResponse<{ orderId: string; status: string }>> => {
    await delay(1200);

    // Let's say a 2 percent chacne of failing request?
    if (Math.random() < 0.02) {
      return {
        data: { orderId: '', status: '' },
        error: 'Payment processing failed. Please try again.'
      };
    }

    const orderId = `ORDER-${Date.now()}`;

    return {
      data: {
        orderId,
        status: 'confirmed'
      }
    };
  }
};
