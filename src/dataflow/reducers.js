import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import user from "./users/reducer";
import workbooks from "./workbooks/reducer";
import templates from "./templates/reducer";
import collections from "./collections/reducer";

const rootReducer = combineReducers({
  templates,
  collections,
  user,
  workbooks,
  form : formReducer,
  routing,
});

export default rootReducer;
