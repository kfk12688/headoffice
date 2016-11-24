import { handleActions } from "redux-actions";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, DELETE_ROW_REQUEST,
  DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE, UPDATE_ROW_REQUEST, UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, ADD_ROW_FAILURE,
  ADD_ROW_REQUEST, ADD_ROW_SUCCESS, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE
} from "./types";

const initialState = {
  list : {
    data      : {},
    isLoading : false,
  }
};

export default handleActions({
  [GET_TEMPLATES_REQUEST] : (state) => ({
    ...state,
    list : {
      isLoading : true,
    },
  }),
  [GET_TEMPLATES_SUCCESS] : (state, action) => ({
    ...state,
    list : {
      isLoading : false,
      data      : action.payload.data,
    },
  }),
  [GET_TEMPLATES_FAILURE] : (state, action) => ({
    ...state,
    list : {
      isLoading : false,
      error     : action.payload.err,
    },
  }),

  /**
   * Specification for data entry in the table
   */
  [SPEC_REQUEST] : state => ({
    ...state,
  }),
  [SPEC_SUCCESS] : (state, action) => {
    const { spec, collectionName } = action.payload;
    const { userSchema, id } = spec;

    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        id,
        spec : userSchema,
      },
    };
  },
  [SPEC_FAILURE] : (state, action) => {
    const { collectionName, error } = action.payload;
    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        error,
      },
    };
  },

  /**
   * Updates server data in the store for the particular template
   */
  [DATA_REQUEST] : (state, action) => {
    const { collectionName } = action.payload;
    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        isLoading : true,
      },
    };
  },
  [DATA_SUCCESS] : (state, action) => {
    const { data, collectionName } = action.payload;
    const { entries, count, pagination } = data;

    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        count,
        pagination,
        isLoading : false,
        data      : {
          ...state[collectionName].data,
          ...entries,
        },
      },
    };
  },
  [DATA_FAILURE] : (state, action) => {
    const { collectionName, error } = action.payload;
    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        isLoading : false,
        error,
      },
    };
  },

  /**
   * Deletes a row from the template collection
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
    error : action.payload,
  }),

  /**
   * Edits an existing row in the template collection
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
    error : action.payload,
  }),

  /**
   * Adds a new row into the template collection
   */
  [ADD_ROW_REQUEST] : state => {
    return {
      ...state,
    };
  },
  [ADD_ROW_SUCCESS] : (state, action) => {
    const { collectionName, data } = action.payload;

    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        ...data,
      },
    };
  },
  [ADD_ROW_FAILURE] : (state, action) => {
    const { collectionName, error } = action.payload;

    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        error,
      },
    };
  },
}, initialState);
