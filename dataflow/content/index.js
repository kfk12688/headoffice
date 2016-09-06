import { combineReducers } from "redux";
import facing from "./facing/reducer";
import editor from "../template/editor/reducer";
import entry from "./entry/reducer";

export default combineReducers({
  facing,
  editor,
  entry,
});
