/**
 * Created by sharavan on 26/06/16.
 */
import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import menu from "./menu/reducer";
import filter from "./filter/reducer";
import content from "./content/reducer";
import user from "./user/reducer";
import editor from "./editor/reducer";

const rootReducer = combineReducers({
  menu,
  filter,
  content,
  user,
  editor,
  form : formReducer,
  routing,
});

export default rootReducer;
