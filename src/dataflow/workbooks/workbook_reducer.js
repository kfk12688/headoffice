import {
  GET_WORKBOOKS_FAILURE, GET_WORKBOOKS_REQUEST, GET_WORKBOOKS_SUCCESS, CREATE_WORKBOOK_FAILURE,
  CREATE_WORKBOOK_REQUEST, CREATE_WORKBOOK_SUCCESS, DELETE_WORKBOOK_REQUEST, DELETE_WORKBOOK_FAILURE,
  DELETE_WORKBOOK_SUCCESS
} from "./types";
import { setFailure } from "utils";

const reducer = {
  [GET_WORKBOOKS_REQUEST] : (state) => {
    return {
      ...state,
      list : {
        isLoading : true,
      },
    };
  },
  [GET_WORKBOOKS_SUCCESS] : (state, action) => {
    const { workbooks } = action.payload;
    return {
      ...state,
      list : {
        data      : workbooks,
        isLoading : false,
      },
    };
  },
  [GET_WORKBOOKS_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  [CREATE_WORKBOOK_REQUEST] : (state) => {
    return {
      ...state,
      list : {
        ...state.list,
        isLoading : true,
      },
    };
  },
  [CREATE_WORKBOOK_SUCCESS] : (state, action) => {
    const { workbook } = action.payload;
    return {
      ...state,
      list : {
        data      : { ...state.list.data, [workbook.id] : workbook },
        isLoading : false,
      },
    };
  },
  [CREATE_WORKBOOK_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  [DELETE_WORKBOOK_REQUEST] : (state) => {
    return {
      ...state,
      list : {
        ...state.list,
        isLoading : true,
      },
    };
  },
  [DELETE_WORKBOOK_SUCCESS] : (state, action) => {
    const { workbook } = action.payload;
    delete state.list.data[workbook.id];

    return {
      ...state,
      list : {
        ...state.list,
        isLoading : false,
      },
    };
  },
  [DELETE_WORKBOOK_FAILURE] : (state, action) => setFailure(action.payload.err, state),
};

export default reducer;
