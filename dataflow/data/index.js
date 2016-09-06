/**
 * Created by sharavan on 06/09/16.
 */
import { combineReducers } from "redux";
import list from "./list/reducer";
import entry from "./entry/reducer";
import view from "./view/reducer";

export default combineReducers({
  list,
  entry,
  view,
});
