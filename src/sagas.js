import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "./actions";

export function* watcherSaga() {
  yield takeLatest(actions.FETCH_PRODUCTS, fetchProducts);
}

function* fetchProducts() {
  try {
    let response = yield axios.get("products");
    yield put({ type: actions.PRODUCTS_FETCHED, products: response.data });
  } catch (e) {
    let error = e.response.data.error || e.toString();
    yield put({ type: actions.API_CALL_FAILURE, error });
  }
}
