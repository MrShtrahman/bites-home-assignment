import { all, fork } from 'redux-saga/effects';
import { cartSaga } from '../_features/cart/cartSaga';
import { ordersSaga } from '../_features/orders/orderSaga';
import { productDetailsSaga } from '../_features/productDetails/productDetailsSaga';
import { productsSaga } from '../_features/products/productsSaga';

export const rootSaga = function* () {
  yield all([
    fork(productsSaga),
    fork(productDetailsSaga),
    fork(cartSaga),
    fork(ordersSaga)
  ]);
};
