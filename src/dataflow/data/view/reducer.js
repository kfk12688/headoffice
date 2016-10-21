import { handleActions } from "redux-actions";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, DELETE_ROW_REQUEST,
  DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE, UPDATE_ROW_REQUEST, UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE
} from "./types";

const initialState = {
  // Object of objects with key as the template id
  spec      : [],
  data      : {},
  error     : {
    code : "",
    msg  : "",
  },
  isLoading : false,
};

const reducer = handleActions({

  /**
   * Specification for data entry in the table
   */
  [SPEC_REQUEST] : state => ({
    ...state,
  }),
  [SPEC_SUCCESS] : (state, action) => {
    const { userSchema, ...rest } = action.payload.data;

    return {
      ...state,
      ...rest,
      spec : userSchema,
    };
  },
  [SPEC_FAILURE] : (state, action) => ({
    ...state,
    error : action.payload.data,
  }),

  /**
   * Updates server data in the store for the particular template
   */
  [DATA_REQUEST] : state => ({
    ...state,
    isLoading : true,
  }),
  [DATA_SUCCESS] : (state, action) => ({
    ...state,
    data      : {
      ...state.data,
      ...action.payload.data,
    },
    isLoading : false,
  }),
  [DATA_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),

  /**
   * Adds a row into the template collection
   */
  [DELETE_ROW_REQUEST] : state => ({
    ...state,
  }),
  [DELETE_ROW_SUCCESS] : (state, action) => {
    const { rowId } = action.payload;
    const data = { ...state.data };
    data.delete(rowId);

    return {
      ...state,
      data,
    };
  },
  [DELETE_ROW_FAILURE] : (state, action) => ({
    ...state,
    error : action.payload.data,
  }),

  /**
   * Adds a row into the template collection
   */
  [UPDATE_ROW_REQUEST] : state => ({
    ...state,
  }),
  [UPDATE_ROW_SUCCESS] : (state, action) => {
    const { rowId, rowData } = action.payload;

    return {
      ...state,
      data : {
        ...state.data,
        [rowId] : rowData,
      },
    };
  },
  [UPDATE_ROW_FAILURE] : (state, action) => ({
    ...state,
    error : action.payload.data,
  }),
}, initialState);

export default reducer;
