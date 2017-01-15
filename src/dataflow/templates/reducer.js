import { handleActions } from "redux-actions";
import templateReducer from "./template_reducer";
import menuReducer from "./menu_reducer";

const initialState = {
  list : {
    isLoading : false,
    data      : {},
  },
};

const reducer = handleActions({
  ...templateReducer,
  ...menuReducer,
}, initialState);

export default reducer;
