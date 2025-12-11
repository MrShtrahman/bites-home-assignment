import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../_store';

const TAX = 0.1;

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  cartState => cartState.items
);

export const selectIsCartHydrated = createSelector(
  [selectCartState],
  cartState => cartState.isHydrated
);

export const selectCartItemsCount = createSelector([selectCartItems], items =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector([selectCartItems], items =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0)
);

export const selectCartTax = createSelector(
  [selectCartSubtotal],
  subtotal => subtotal * TAX
);

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectCartTax],
  (subtotal, tax) => subtotal + tax
);

export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  items => items.length === 0
);

export const selectCartItemByProductId = (productId: string) =>
  createSelector([selectCartItems], items =>
    items.find(item => item.product.id === productId)
  );

export const selectIsProductInCart = (productId: string) =>
  createSelector([selectCartItems], items =>
    items.some(item => item.product.id === productId)
  );

export const selectCartItemQuantity = (productId: string) =>
  createSelector([selectCartItems], items => {
    const item = items.find(i => i.product.id === productId);
    return item?.quantity ?? 0;
  });
