import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, debounce, put, select, takeLatest } from 'redux-saga/effects';
import { RootState } from '../../_store';
import {
  addToCart,
  clearCart,
  decrementItemQuantity,
  hydrateCartFailure,
  hydrateCartRequest,
  hydrateCartSuccess,
  incrementItemQuantity,
  removeFromCart,
  updateCartItemQuantity
} from './cartSlice';
import { CartItem } from './types';

const CART_STORAGE_KEY = 'cart';

const hydrateCartSaga = function* () {
  try {
    const cartJson: string | undefined = yield call(
      [AsyncStorage, 'getItem'],
      CART_STORAGE_KEY
    );

    if (cartJson) {
      const cartItems: CartItem[] = JSON.parse(cartJson);
      yield put(hydrateCartSuccess(cartItems));
    } else {
      yield put(hydrateCartSuccess([]));
    }
  } catch (error) {
    yield put(
      hydrateCartFailure(
        error instanceof Error ? error.message : 'Failed to load cart'
      )
    );
  }
};

const persistCartSaga = function* () {
  try {
    const state: RootState = yield select();
    const { items } = state.cart;

    const cartJson = JSON.stringify(items);
    yield call([AsyncStorage, 'setItem'], CART_STORAGE_KEY, cartJson);
  } catch (error) {
    console.error('Persist failed', error);
  }
};

const clearCartPersistSaga = function* () {
  try {
    yield call([AsyncStorage, 'removeItem'], CART_STORAGE_KEY);
  } catch (error) {
    console.error('Clear failed', error);
  }
};

export const cartSaga = function* () {
  yield takeLatest(hydrateCartRequest.type, hydrateCartSaga);

  yield debounce(500, addToCart.type, persistCartSaga);
  yield debounce(500, updateCartItemQuantity.type, persistCartSaga);
  yield debounce(500, removeFromCart.type, persistCartSaga);
  yield debounce(500, incrementItemQuantity.type, persistCartSaga);
  yield debounce(500, decrementItemQuantity.type, persistCartSaga);

  yield takeLatest(clearCart.type, clearCartPersistSaga);
};
