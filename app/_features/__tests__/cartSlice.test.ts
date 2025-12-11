import cartSlice, { addToCart, clearCart } from "../cart/cartSlice";
import { CartState } from "../cart/types";
import { mockProduct } from "./mocks";

describe('cartSlice', () => {
  const initialState: CartState = {
    items: [],
    isHydrated: true,
    isLoading: false,
    error: null
  };

  it('should add item to cart', () => {
    const state = cartSlice(
      initialState,
      addToCart({ product: mockProduct, quantity: 2 })
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should not exceed stock limit', () => {
    const state = cartSlice(
      initialState,
      addToCart({ product: mockProduct, quantity: 999 })
    );

    expect(state.items[0].quantity).toBe(10);
  });

  it('should clear cart', () => {
    const stateWithItems: CartState = {
      ...initialState,
      items: [
        { product: mockProduct, quantity: 2, addedAt: new Date().toISOString() }
      ]
    };

    const state = cartSlice(stateWithItems, clearCart());

    expect(state.items).toHaveLength(0);
  });
});
