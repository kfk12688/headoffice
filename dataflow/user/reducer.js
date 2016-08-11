import { handleActions } from "redux-actions";
import * as t from "./types";

const initialState = {
  data         : {},
  isLoading    : false,
  error        : {},
};

const reducer = handleActions({
  [t.USER_REQUEST]         : (state) => ({
    ...state,
    isLoading : true,
  }),
  [t.USER_SUCCESS]         : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [t.USER_FAILURE]         : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
  [t.NEW_USER_REQUEST]     : (state) => ({
    ...state,
    isLoading : true,
  }),
  [t.NEW_USER_SUCCESS]     : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [t.NEW_USER_FAILURE]     : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
}, initialState);

export default reducer;
