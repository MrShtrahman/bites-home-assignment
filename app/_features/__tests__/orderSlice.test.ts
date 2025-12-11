import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { mockApi } from '../../_shared/mockApi';
import { clearCart } from '../cart/cartSlice';
import { CartItem } from '../cart/types';
import { ordersSaga } from '../orders/orderSaga';
import { placeOrderFailure, placeOrderRequest } from '../orders/ordersSlice';
import { mockProduct } from './mocks';

const mockCartItems: CartItem[] = [{
  product: mockProduct, quantity: 2, addedAt: new Date().toISOString()
}];

describe('ordersSaga', () => {
  it('should clear cart after successful order', () => {
    const mockResponse = {
      data: {
        orderId: 'ORDER-123',
        status: 'confirmed'
      }
    };

    expectSaga(ordersSaga)
      .provide([
        [
          call(mockApi.placeOrder, {
            items: [{ productId: 'product-1', quantity: 2 }],
            totalAmount: 99.99 * 2
          }),
          mockResponse
        ]
      ])
      .put(clearCart())
      .dispatch(
        placeOrderRequest({ items: mockCartItems, totalAmount: 99.99 * 2 })
      )
      .run();
  });

  it('should not clear cart when order fails', () => {
    const mockResponse = {
      data: { orderId: '', status: '' },
      error: 'Payment processing failed'
    };

    return expectSaga(ordersSaga)
      .provide([
        [
          call(mockApi.placeOrder, {
            items: [{ productId: 'product-1', quantity: 2 }],
            totalAmount: 99.99 * 2
          }),
          mockResponse
        ]
      ])
      .put(placeOrderFailure('Payment processing failed'))
      .not.put(clearCart())
      .dispatch(
        placeOrderRequest({ items: mockCartItems, totalAmount: 199.98 })
      )
      .run();
  });
});
