import { handleActions } from "redux-actions";
import {
  WORKBOOK_REQUEST, WORKBOOK_SUCCESS, WORKBOOK_FAILURE, NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS,
  NEW_WORKBOOK_FAILURE
} from "./types";

const initialState = {};

const reducer = handleActions({
  [WORKBOOK_REQUEST] : (state) => {
    return {
      ...state,
      list : {
        isLoading : true,
      },
    };
  },
  [WORKBOOK_SUCCESS] : (state, action) => {
    const { workbooks } = action.payload;
    return {
      ...state,
      list : {
        data      : workbooks,
        isLoading : false,
      },
    };
  },
  [WORKBOOK_FAILURE] : (state, action) => {
    const { err } = action.payload;
    return {
      ...state,
      list : {
        isLoading : false,
        error     : err,
      },
    };
  },

  [NEW_WORKBOOK_REQUEST] : (state) => {
    return {
      ...state,
      list : {
        ...state.list,
        isLoading : true,
      },
    };
  },
  [NEW_WORKBOOK_SUCCESS] : (state, action) => {
    const { workbook } = action.payload;
    return {
      ...state,
      list : {
        data      : { ...state.list.data, [workbook.id] : workbook },
        isLoading : false,
      },
    };
  },
  [NEW_WORKBOOK_FAILURE] : (state, action) => {
    const { err } = action.payload;
    return {
      ...state,
      list : {
        ...state.list,
        isLoading : false,
        error     : err,
      },
    };
  },
}, initialState);

export default reducer;
