import { handleActions } from "redux-actions";
import {
  NEW_USER_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAILURE, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS
} from "./types";

const initialState = {
  data      : {},
  isLoading : false,
  error     : {},
};

const reducer = handleActions({
  [GET_USERS_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [GET_USERS_SUCCESS] : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [GET_USERS_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
  [NEW_USER_REQUEST]  : (state) => ({
    ...state,
    isLoading : true,
  }),
  [NEW_USER_SUCCESS]  : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [NEW_USER_FAILURE]  : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
}, initialState);

export default reducer;
