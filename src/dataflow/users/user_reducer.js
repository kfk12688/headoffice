import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from "./types";

const userReducer = {
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
};

export default userReducer;
