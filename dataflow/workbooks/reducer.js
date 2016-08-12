import { handleActions } from "redux-actions";
import {
  WORKBOOK_REQUEST, WORKBOOK_SUCCESS, WORKBOOK_FAILURE, NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS,
  NEW_WORKBOOK_FAILURE
} from "./types";

const initialState = {
  data      : {},
  isLoading : false,
  error     : {},
};

const reducer = handleActions({
  [WORKBOOK_REQUEST]     : (state) => ({
    ...state,
    isLoading : true,
  }),
  [WORKBOOK_SUCCESS]     : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [WORKBOOK_FAILURE]     : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
  [NEW_WORKBOOK_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [NEW_WORKBOOK_SUCCESS] : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [NEW_WORKBOOK_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
}, initialState);

export default reducer;
