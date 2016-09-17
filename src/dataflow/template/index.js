/**
 * Created by sharavan on 06/09/16.
 */
import { combineReducers } from "redux";
import list from "./list/reducer";
import editor from "./editor/reducer";

export default combineReducers({
  list,
  editor,
});
