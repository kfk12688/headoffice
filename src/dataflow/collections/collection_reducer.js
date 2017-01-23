import R from "ramda";
import { set, unset, setFailure, setMessage, loaded, loading, loadCollection } from "utils";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, DELETE_ROW_REQUEST,
  DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE, UPDATE_ROW_REQUEST, UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, ADD_ROW_FAILURE,
  ADD_ROW_REQUEST, ADD_ROW_SUCCESS, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE,
  STAR_COLLECTION_SUCCESS, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, EDIT_TEMPLATE_FAILURE,
  DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE
} from "./types";

const setLoadingByID = id => set(["data", id, "isLoading"], true);
const setLoadedByID  = id => set(["data", id, "isLoading"], false);

const collectionReducer = {
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

  [EDIT_TEMPLATE_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [EDIT_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName, message } = action.payload;
    const setData                               = R.compose(
      setMessage(message),
      set(null, template, collectionName),
      loaded(collectionName),
      set(collectionName, template, "list"),
      set(["data", collectionName], template, "list"),
      loaded("list"),
    );
    return setData(state);
  },
  [EDIT_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  [DELETE_TEMPLATE_REQUEST] : (state, action) => loading("list", state),
  [DELETE_TEMPLATE_SUCCESS] : (state, action) => {
    const { collectionName, message } = action.payload;
    const deleteTemplate              = R.compose(
      loaded("list"),
      setMessage(message),
      unset(["data", collectionName], "list"),
      unset(null, collectionName),
    );
    return deleteTemplate(state);
  },
  [DELETE_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload.err, state),

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
  [SPEC_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  /**
   * Updates server data in the store for the particular template
   */
  [DATA_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [DATA_SUCCESS] : (state, action) => {
    const { data, collectionName }                = action.payload;
    const { entries, count, pagination }          = data;

    const setData = R.compose(
      set("data", entries, collectionName),
      set("pagination", pagination, collectionName),
      set("count", count, collectionName),
      loaded("list"),
      loaded(collectionName),
    );
    return setData(state);
  },
  [DATA_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  /**
   * Deletes a row from the collection
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
  [DELETE_ROW_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  /**
   * Edits an existing row in the collection
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
  [UPDATE_ROW_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  /**
   * Adds a new row into the collection
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
  [ADD_ROW_FAILURE] : (state, action) => setFailure(action.payload.err, state),

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
};

export default collectionReducer;
