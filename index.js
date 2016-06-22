import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./store/configureStore";
import App from "./containers/App";
import "./styles/styles.css";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/template" component={App}/>
      <Route path="/content" component={App}/>
    </Router>
  </Provider>,
  document.getElementById("HOApp")
);
