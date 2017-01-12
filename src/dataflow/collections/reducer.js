import R from "ramda";
import { set, unset, setError, setMessage, loaded, loading, loadCollection } from "utils";
import { handleActions } from "redux-actions";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, DELETE_ROW_REQUEST,
  DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE, UPDATE_ROW_REQUEST, UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, ADD_ROW_FAILURE,
  ADD_ROW_REQUEST, ADD_ROW_SUCCESS, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE,
  STAR_COLLECTION_SUCCESS
} from "./types";

const initialState   = {
  list : {
    data      : {},
    isLoading : false,
  },
};
const setFailure     = (error, message) => R.compose(
  setMessage(message),
  setError(error),
  loaded("list"),
);
const setLoadingByID = id => set(["data", id, "isLoading"], true);
const setLoadedByID  = id => set(["data", id, "isLoading"], false);

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
    const { data, collectionName }                = action.payload;
    const { entries, count, pagination }          = data;
    const setData                                 = R.compose(
      set(["data", "entries"], entries, collectionName),
      set("pagination", pagination, collectionName),
      set("count", count, collectionName),
      loaded(collectionName)
    );
    return setData(state);
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
    const { rowId, collectionName, message } = action.payload;
    const setData                            = R.compose(
      setMessage(message),
      unset(["data", rowId], collectionName),
      loaded(collectionName)
    );
    return setData(state);
  },
  [DELETE_ROW_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  /**
   * Edits an existing row in the template collection
   */
  [UPDATE_ROW_REQUEST] : (state, action) => {
    const { rowID, collectionName } = action.payload;
    return setLoadingByID(rowID, collectionName, state);
  },
  [UPDATE_ROW_SUCCESS] : (state, action) => {
    const { rowId, rowData, message, collectionName } = action.payload;
    const setData                                     = R.compose(
      setLoadedByID(collectionName),
      setMessage(message),
      set(["data", rowId], rowData, collectionName),
      loaded(collectionName)
    );
    return setData(state);
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
    const { collectionName, data, message } = action.payload;
    const setData                           = R.compose(
      setMessage(message),
      set("data", data, collectionName),
      loaded(collectionName),
    );
    return setData(state);
  },
  [ADD_ROW_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  /**
   * Star/Unstar the collection's (template)
   */
  [STAR_COLLECTION_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const isFavorite                   = template.isFavorite;
    const setIsFavorite                = R.compose(
      set("isFavorite", isFavorite, collectionName),
      set(["data", collectionName, "isFavorite"], isFavorite, "list"),
    );
    return setIsFavorite(state);
  },
}, initialState);
