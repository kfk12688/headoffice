import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import form from "./form/reducer";
import menu from "./menu/reducer";
import filter from "./filter/reducer";
import user from "./user/reducer";
import workbooks from "./workbooks/reducer";
import content from "./content";

const rootReducer = combineReducers({
  menu,
  filter,
  content,
  user,
  workbooks,
  form,
  routing,
});

export default rootReducer;
