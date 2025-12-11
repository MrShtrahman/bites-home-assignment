import { LoadingState, Product } from '../../_shared/types';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface CartState extends LoadingState {
  items: CartItem[];
  isHydrated: boolean;
}

export interface AddToCartPayload {
  product: Product;
  quantity: number;
}

export interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
}
