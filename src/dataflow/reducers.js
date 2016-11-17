import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import menu from "./menu/reducer";
import filter from "./filter/reducer";
import user from "./users/reducer";
import workbooks from "./workbooks/reducer";
import templates from "./templates/reducer";
import collections from "./collections/reducer";

const rootReducer = combineReducers({
  menu,
  filter,
  templates,
  collections,
  user,
  workbooks,
  form : formReducer,
  routing,
});

export default rootReducer;
