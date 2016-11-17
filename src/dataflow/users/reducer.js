import { handleActions } from "redux-actions";
import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from "./types";

const initialState = {
  data            : {},
  isLoading       : false,
  error           : {},
  currentUser     : {},
  isAuthenticated : false,
};

const reducer = handleActions({
  [ADD_CURRENT_USER]    : (state, action) => ({
    ...state,
    currentUser     : action.payload.data,
    isAuthenticated : true,
  }),
  [REMOVE_CURRENT_USER] : (state, action) => ({
    ...state,
    currentUser     : {},
    isAuthenticated : false,
  }),
}, initialState);

export default reducer;
