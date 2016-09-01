import { handleActions } from "redux-actions";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, UPDATE_ROW_REQUEST,
  UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE, ADD_ROW_REQUEST,
  ADD_ROW_SUCCESS, ADD_ROW_FAILURE
} from "./types";

const initialState = {
  // Object of objects with key as the template id
  primaryKey        : "",
  spec              : [],
  data              : {},
  error             : {
    code : "",
    msg  : "",
  },
  loadingIndicators : {
    spec : false,
    row  : false,
    data : false,
  },
  selectedRow       : null,
};

const reducer = handleActions({

  /**
   * Specification for data entry in the table
   */
  [SPEC_REQUEST] : state => ({
    ...state,
    spec              : [],
    loadingIndicators : {
      ...state.loadingIndicators,
      spec : true,
    },
  }),
  [SPEC_SUCCESS] : (state, action) => {
    const { userSchema, ...rest } = action.payload.data;

    return {
      ...state,
      ...rest,
      spec              : userSchema,
      loadingIndicators : {
        ...state.loadingIndicators,
        spec : false,
      },
    };
  },
  [SPEC_FAILURE] : (state, action) => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      spec : false,
    },
    error             : action.payload.data,
  }),

  /**
   * Updates server data in the store for the particular template
   */
  [DATA_REQUEST] : state => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      data : true,
    },
  }),
  [DATA_SUCCESS] : (state, action) => ({
    ...state,
    data              : action.payload.data,
    loadingIndicators : {
      ...state.loadingIndicators,
      data : false,
    },
  }),
  [DATA_FAILURE] : (state, action) => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      data : false,
    },
    error             : action.payload.data,
  }),

  /**
   * Adds a row into the template collection
   */
  [ADD_ROW_REQUEST] : state => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      row : true,
    },
  }),
  [ADD_ROW_SUCCESS] : (state, action) => {
    const { rowId, rowData } = action.payload;

    return {
      ...state,
      data              : {
        ...state.data,
        [rowId] : rowData,
      },
      loadingIndicators : {
        ...state.loadingIndicators,
        row : false,
      },
    };
  },
  [ADD_ROW_FAILURE] : (state, action) => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      row : false,
    },
    error             : action.payload.data,
  }),

  /**
   * Adds a row into the template collection
   */
  [DELETE_ROW_REQUEST] : state => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      row : true,
    },
  }),
  [DELETE_ROW_SUCCESS] : (state, action) => {
    const { rowId } = action.payload;
    const data = { ...state.data };
    data.delete(rowId);

    return {
      ...state,
      data,
      loadingIndicators : {
        ...state.loadingIndicators,
        row : false,
      },
    };
  },
  [DELETE_ROW_FAILURE] : (state, action) => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      row : false,
    },
    error             : action.payload.data,
  }),

  /**
   * Adds a row into the template collection
   */
  [UPDATE_ROW_REQUEST] : state => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      row : true,
    },
  }),
  [UPDATE_ROW_SUCCESS] : (state, action) => {
    const { rowId, rowData } = action.payload;

    return {
      ...state,
      data              : {
        ...state.data,
        [rowId] : rowData,
      },
      loadingIndicators : {
        ...state.loadingIndicators,
        row : false,
      },
    };
  },
  [UPDATE_ROW_FAILURE] : (state, action) => ({
    ...state,
    loadingIndicators : {
      ...state.loadingIndicators,
      row : false,
    },
    error             : action.payload.data,
  }),

}, initialState);

export default reducer;
