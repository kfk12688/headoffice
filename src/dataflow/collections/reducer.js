import { handleActions } from "redux-actions";
import collectionReducer from "./collection_reducer";
import menuReducer from "./menu_reducer";

const initialState = {
  list : {
    data      : {},
    isLoading : false,
  },
};

const reducer = handleActions({
  ...collectionReducer,
  ...menuReducer,
}, initialState);

export default reducer;

