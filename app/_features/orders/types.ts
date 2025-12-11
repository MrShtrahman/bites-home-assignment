import { LoadingState } from '../../_shared/types';
import { CartItem } from '../cart/types';

export interface OrdersState extends LoadingState {
  currentOrder: Order | null;
  isPlacingOrder: boolean;
}

export interface Order {
  orderId: string;
  status: string;
  items: CartItem[];
  totalAmount: number;
  placedAt: string;
}

export interface PlaceOrderPayload {
  items: CartItem[];
  totalAmount: number;
}
