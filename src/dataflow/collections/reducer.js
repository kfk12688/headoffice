import R from "ramda";
import { set, setError, setMessage, loaded, loading, loadCollection } from "../utils";
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
  },
};
const setFailure   = (error, message) => R.compose(
  setMessage(message),
  setError(error),
  loaded("list"),
);

export default handleActions({
  [GET_TEMPLATES_REQUEST] : (state) => loading("list", state),
  [GET_TEMPLATES_SUCCESS] : (state, action) => {
    const { data } = action.payload;
    const setData  = R.compose(
      set("data", data, "list"),
      loaded("list")
    );
    return setData(state);
  },
  [GET_TEMPLATES_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  /**
   * Specification for data entry in the table
   */
  [SPEC_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [SPEC_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const setData                      = R.compose(
      set(null, template, collectionName),
      set(["data", collectionName], template, "list"),
      loaded("list")
    );
    return setData(state);
  },
  [SPEC_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  /**
   * Updates server data in the store for the particular template
   */
  [DATA_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [DATA_SUCCESS] : (state, action) => {
    const { data, collectionName }       = action.payload;
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
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  /**
   * Deletes a row from the template collection
   */
  [DELETE_ROW_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [DELETE_ROW_SUCCESS] : (state, action) => {
    const { rowId } = action.payload;
    const data      = { ...state.data };
    data.delete(rowId);

    return {
      ...state,
      data,
    };
  },
  [DELETE_ROW_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  /**
   * Edits an existing row in the template collection
   */
  [UPDATE_ROW_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
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
  [UPDATE_ROW_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  /**
   * Adds a new row into the template collection
   */
  [ADD_ROW_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
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
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },
}, initialState);
