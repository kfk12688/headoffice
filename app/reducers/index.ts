/**
 * Created by sharavan on 16/06/16.
 */
import { combineReducers } from "redux";
import contextMenuReducer from "./contextMenuReducer";
import contentReducer from "./contentReducer";

const appReducer = combineReducers({
  contextMenu: contextMenuReducer,
  content: contentReducer
})

export default appReducer
