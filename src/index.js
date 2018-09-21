import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "https://test-recrutement.loyaltyexpert.net/";
axios.defaults.headers.common = {
  accept: "application/json",
};

ReactDOM.render(<App />, document.getElementById("root"));
