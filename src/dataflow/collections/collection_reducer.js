import { compose, set, unset, setFailure, setMessage, loaded, loading, loadingCollection } from "utils";
import { GET_SPEC_REQUEST, GET_SPEC_SUCCESS, GET_SPEC_FAILURE, GET_COLLECTIONS_REQUEST, GET_COLLECTIONS_SUCCESS, GET_COLLECTIONS_FAILURE, STAR_COLLECTION_SUCCESS, EDIT_COLLECTION_REQUEST, EDIT_COLLECTION_SUCCESS, EDIT_COLLECTION_FAILURE, DELETE_COLLECTION_REQUEST, DELETE_COLLECTION_SUCCESS, DELETE_COLLECTION_FAILURE, GET_COLLECTION_REQUEST, GET_COLLECTION_SUCCESS, GET_COLLECTION_FAILURE } from "./types";

const collectionReducer = {
  [GET_COLLECTIONS_REQUEST] : (state) => loading("list", state),
  [GET_COLLECTIONS_SUCCESS] : (state, action) => {
    const { data } = action.payload;
    const setData  = compose(
      set("data", data, "list"),
      loaded("list")
    );
    return setData(state);
  },
  [GET_COLLECTIONS_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  [GET_COLLECTION_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [GET_COLLECTION_SUCCESS] : (state, action) => {
    const { data, collectionName } = action.payload;
    const setData                  = compose(
      set(null, data, collectionName),
      loaded(collectionName),
    );
    return setData(state);
  },
  [GET_COLLECTION_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  [EDIT_COLLECTION_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [EDIT_COLLECTION_SUCCESS] : (state, action) => {
    const { data, collectionName, message } = action.payload;
    const setData                           = compose(
      setMessage(message),
      set(null, data, collectionName),
      loaded(collectionName),
    );
    return setData(state);
  },
  [EDIT_COLLECTION_FAILURE] : (state, action) => setFailure(action.payload, state),

  [DELETE_COLLECTION_REQUEST] : (state, action) => loading("list", state),
  [DELETE_COLLECTION_SUCCESS] : (state, action) => {
    const { collectionName, message } = action.payload;
    const deleteTemplate              = compose(
      setMessage(message),
      unset(null, collectionName),
      loaded(collectionName),
    );
    return deleteTemplate(state);
  },
  [DELETE_COLLECTION_FAILURE] : (state, action) => setFailure(action.payload, state),

  [GET_SPEC_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [GET_SPEC_SUCCESS] : (state, action) => {
    const { data, collectionName } = action.payload;
    const setData                  = compose(
      set(null, data, collectionName),
      loaded(collectionName),
    );
    return setData(state);
  },
  [GET_SPEC_FAILURE] : (state, action) => setFailure(action.payload, state),

  [STAR_COLLECTION_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const isFavorite                   = template.isFavorite;
    const setIsFavorite                = compose(
      set("isFavorite", isFavorite, collectionName),
      set(["data", collectionName, "isFavorite"], isFavorite, "list"),
    );
    return setIsFavorite(state);
  },
};

export default collectionReducer;
