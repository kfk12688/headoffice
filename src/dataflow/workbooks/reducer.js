import { handleActions } from "redux-actions";
import workbookReducer from "./workbook_reducer";
import menuReducer from "./menu_reducer";

const initialState = {
  list : {
    isLoading : false,
    data      : {},
  },
};

const reducer = handleActions({
  ...workbookReducer,
  ...menuReducer,
}, initialState);

export default reducer;

