import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';

import cartReducer from '../_features/cart/cartSlice';
import ordersReducer from '../_features/orders/ordersSlice';
import productDetailsReducer from '../_features/productDetails/productDetailsSlice';
import productsReducer from '../_features/products/productsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    orders: ordersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
