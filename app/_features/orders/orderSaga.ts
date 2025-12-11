import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { mockApi } from '../../_shared/mockApi';
import { ApiResponse } from '../../_shared/types';
import { clearCart } from '../cart/cartSlice';
import {
  placeOrderFailure,
  placeOrderRequest,
  placeOrderSuccess,
  setCurrentOrder
} from './ordersSlice';
import { Order, PlaceOrderPayload } from './types';

const placeOrderSaga = function* (action: PayloadAction<PlaceOrderPayload>) {
  const { items, totalAmount } = action.payload;

  const orderData = {
    items: items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    })),
    totalAmount
  };

  const response: ApiResponse<{ orderId: string; status: string }> = yield call(
    mockApi.placeOrder,
    orderData
  );

  if (response.error) {
    yield put(placeOrderFailure(response.error));
    return;
  }

  const { orderId, status } = response.data;

  const order: Order = {
    orderId,
    status,
    items,
    totalAmount,
    placedAt: new Date().toISOString()
  };

  yield put(clearCart());

  yield put(placeOrderSuccess({ orderId, status }));
  yield put(setCurrentOrder(order));
};

export const ordersSaga = function* () {
  yield takeLatest(placeOrderRequest.type, placeOrderSaga);
};
