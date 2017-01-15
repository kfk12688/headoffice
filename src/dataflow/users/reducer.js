import { handleActions } from "redux-actions";
import userReducer from "./user_reducer";
import menuReducer from "./menu_reducer";

const initialState = {
  data            : {},
  isLoading       : false,
  error           : {},
  currentUser     : {},
  isAuthenticated : false,
};

const reducer = handleActions({
  ...userReducer,
  ...menuReducer,
}, initialState);

export default reducer;

