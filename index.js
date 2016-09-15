import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./dataflow/configureStore";
import RootRoute from "./routes/App/route";

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={RootRoute}/>
  </Provider>,
  document.getElementById("HOApp")
);
