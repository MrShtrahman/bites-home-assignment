import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../_shared/types';
import { ProductDetailsState } from './types';

const initialState: ProductDetailsState = {
  product: null,
  selectedQuantity: 1,
  isLoading: false,
  error: null
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    fetchProductDetailsRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },

    fetchProductDetailsSuccess: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      state.selectedQuantity = 1;
      state.isLoading = false;
      state.error = null;
    },

    fetchProductDetailsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    setSelectedQuantity: (state, action: PayloadAction<number>) => {
      const quantity = action.payload;
      const maxQuantity = state.product?.stock ?? 1;

      if (quantity < 1) {
        state.selectedQuantity = 1;
      } else if (quantity > maxQuantity) {
        state.selectedQuantity = maxQuantity;
      } else {
        state.selectedQuantity = quantity;
      }
    },

    incrementQuantity: state => {
      const maxQuantity = state.product?.stock ?? 1;
      if (state.selectedQuantity < maxQuantity) {
        state.selectedQuantity += 1;
      }
    },

    decrementQuantity: state => {
      if (state.selectedQuantity > 1) {
        state.selectedQuantity -= 1;
      }
    },

    resetProductDetails: () => initialState
  }
});

export const {
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
  setSelectedQuantity,
  incrementQuantity,
  decrementQuantity,
  resetProductDetails
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
