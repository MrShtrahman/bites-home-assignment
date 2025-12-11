import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../cart/types';
import { Order, OrdersState } from './types';

const initialState: OrdersState = {
  currentOrder: null,
  isPlacingOrder: false,
  isLoading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrderRequest: (state, action: PayloadAction<{ totalAmount: number; items: CartItem[] }>) => {
      state.isPlacingOrder = true;
      state.error = null;
    },

    placeOrderSuccess: (
      state,
      action: PayloadAction<{ orderId: string; status: string }>
    ) => {
      const { orderId, status } = action.payload;

      state.currentOrder = {
        orderId,
        status,
        items: [],
        totalAmount: 0,
        placedAt: new Date().toISOString()
      };

      state.isPlacingOrder = false;
      state.error = null;
    },

    placeOrderFailure: (state, action: PayloadAction<string>) => {
      state.isPlacingOrder = false;
      state.error = action.payload;
    },

    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },

    clearCurrentOrder: state => {
      state.currentOrder = null;
    },

    resetOrders: () => initialState
  }
});

export const {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  setCurrentOrder,
  clearCurrentOrder,
  resetOrders
} = ordersSlice.actions;

export default ordersSlice.reducer;
