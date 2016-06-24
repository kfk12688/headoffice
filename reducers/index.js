/**
 * Created by sharavan on 16/06/16.
 */
import { combineReducers } from "redux";
import contextMenuReducer from "./contextMenuReducer";
import templateReducer from "./templateReducer";

import { routerReducer as routing } from "react-router-redux";

const appReducer = combineReducers({
  contextMenu : contextMenuReducer,
  list        : templateReducer,
  routing,
});

export default appReducer;
export * from "./utils";
