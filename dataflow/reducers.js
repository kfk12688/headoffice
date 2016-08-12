/**
 * Created by sharavan on 26/06/16.
 */
import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import form from "./form/reducer";
import menu from "./menu/reducer";
import filter from "./filter/reducer";
import content from "./content/reducer";
import user from "./user/reducer";
import editor from "./editor/reducer";
import workbooks from "./workbooks/reducer";

const rootReducer = combineReducers({
  menu,
  filter,
  content,
  user,
  editor,
  form,
  workbooks,
  routing,
});

export default rootReducer;
