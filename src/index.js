import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watcherSaga);

axios.defaults.baseURL = "https://test-recrutement.loyaltyexpert.net/";
axios.defaults.headers.common = {
  accept: "application/json",
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
