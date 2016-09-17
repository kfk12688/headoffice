import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import menu from "./menu/reducer";
import filter from "./filter/reducer";
import user from "./user/reducer";
import workbooks from "./workbooks/reducer";
import template from "./template";
import data from "./data";
import auth from "./auth/reducer";

const rootReducer = combineReducers({
  menu,
  filter,
  template,
  data,
  user,
  auth,
  workbooks,
  form : formReducer,
  routing,
});

export default rootReducer;
