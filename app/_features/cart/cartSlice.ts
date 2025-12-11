import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddToCartPayload,
  CartItem,
  CartState,
  UpdateCartItemPayload
} from './types';

const initialState: CartState = {
  items: [],
  isHydrated: false,
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        const maxQuantity = product.stock;

        state.items[existingItemIndex].quantity = Math.min(
          newQuantity,
          maxQuantity
        );
      } else {
        const newItem: CartItem = {
          product,
          quantity: Math.min(quantity, product.stock),
          addedAt: new Date().toISOString()
        };
        state.items.push(newItem);
      }
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<UpdateCartItemPayload>
    ) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.product.id === productId
      );

      if (itemIndex > -1) {
        const item = state.items[itemIndex];
        const maxQuantity = item.product.stock;

        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = Math.min(quantity, maxQuantity);
        }
      }
    },

    incrementItemQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        item => item.product.id === action.payload
      );

      if (itemIndex > -1) {
        const item = state.items[itemIndex];
        if (item.quantity < item.product.stock) {
          state.items[itemIndex].quantity += 1;
        }
      }
    },

    decrementItemQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        item => item.product.id === action.payload
      );

      if (itemIndex > -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.product.id !== action.payload
      );
    },

    clearCart: state => {
      state.items = [];
    },

    hydrateCartRequest: () => {},

    hydrateCartSuccess: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.isHydrated = true;
    },

    hydrateCartFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isHydrated = true;
    },

    persistCartRequest: () => {}
  }
});

export const {
  addToCart,
  updateCartItemQuantity,
  incrementItemQuantity,
  decrementItemQuantity,
  removeFromCart,
  clearCart,
  hydrateCartRequest,
  hydrateCartSuccess,
  hydrateCartFailure,
  persistCartRequest,
} = cartSlice.actions;

export default cartSlice.reducer;
