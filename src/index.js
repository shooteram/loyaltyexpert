import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./reducers";

let store = createStore(reducer);

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
