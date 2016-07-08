import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import callAPI from "./middleware/callAPI";
import rootReducer from "./reducers";

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(callAPI, thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
