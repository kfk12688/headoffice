/**
 * Created by sharavan on 16/06/16.
 */
import { combineReducers } from "redux";
import contextMenuReducer from "./contextMenuReducer";
import contentReducer from "./contentReducer";
import { routerReducer as routing } from "react-router-redux";

const appReducer = combineReducers({
  contextMenu : contextMenuReducer,
  content     : contentReducer,
  routing,
});

export default appReducer;
