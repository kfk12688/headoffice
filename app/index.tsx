import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { AppConnector } from "./containers/App";
import reducers from "./reducers/index";

const store = createStore(reducers,
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store}>
    <AppConnector/>
  </Provider>,
  document.getElementById("HOApp")
)
