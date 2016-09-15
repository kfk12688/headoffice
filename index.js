import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./dataflow/configureStore";
import getRoute from "./routes/getRoute";

const rootRoute = getRoute();
const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={rootRoute}/>
  </Provider>,
  document.getElementById("HOApp")
);
