import { handleActions } from "redux-actions";
import templateReducer from "./template_reducer";
import schemaReducer from "./schema_reducer";
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
  ...schemaReducer,
}, initialState);

export default reducer;
