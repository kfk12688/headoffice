/**
 * Created by sharavan on 15/09/16.
 */
import { handleActions } from "redux-actions";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST } from "./types";

const initialState = {
  isFetching      : false,
  isAuthenticated : localStorage.getItem("id_token") !== null,
};

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
const auth = handleActions({
  [LOGIN_REQUEST]  : (state, action) => ({
    ...state,
    isFetching      : true,
    isAuthenticated : false,
  }),
  [LOGIN_SUCCESS]  : (state, action) => ({
    ...state,
    isFetching      : false,
    isAuthenticated : true,
    user            : action.payload.user,
    errorMessage    : "",
  }),
  [LOGIN_FAILURE]  : (state, action) => ({
    ...state,
    isFetching      : false,
    isAuthenticated : false,
    errorMessage    : action.payload.message,
  }),
  [LOGOUT_REQUEST] : (state) => ({
    ...state,
    isFetching      : true,
    isAuthenticated : false,
  }),
  [LOGOUT_SUCCESS] : (state) => ({
    ...state,
    isFetching      : false,
    isAuthenticated : false,
  }),
}, initialState);

export default auth;
