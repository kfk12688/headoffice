import { handleActions } from "redux-actions";
import collectionReducer from "./collection_reducer";
import menuReducer from "./menu_reducer";
import itemReducer from "./item_reducer";

const initialState = {
  list : {
    isLoading : false,
    data      : {},
  },
};

const reducer = handleActions({
  ...collectionReducer,
  ...menuReducer,
  ...itemReducer,
}, initialState);

export default reducer;
