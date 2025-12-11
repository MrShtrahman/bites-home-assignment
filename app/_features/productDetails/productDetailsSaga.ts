import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { mockApi } from '../../_shared/mockApi';
import { ApiResponse, Product } from '../../_shared/types';
import {
  fetchProductDetailsFailure,
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess
} from './productDetailsSlice';

const fetchProductDetailsSaga = function* (action: PayloadAction<string>) {
  const productId = action.payload;

  const response: ApiResponse<Product> = yield call(
    mockApi.fetchProductById,
    productId
  );

  if (response.error) {
    yield put(fetchProductDetailsFailure(response.error));
    return;
  }

  yield put(fetchProductDetailsSuccess(response.data));
};

export const productDetailsSaga = function* () {
  yield takeLatest(fetchProductDetailsRequest.type, fetchProductDetailsSaga);
};
