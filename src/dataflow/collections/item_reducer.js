import { compose, set, merge, unset, setFailure, setMessage, loaded, loading, loadingCollection } from "utils";
import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE, UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE, ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE, GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_FAILURE } from "./types";

const setLoadingByID = id => set(["items", id, "isLoading"], true);
const setLoadedByID  = id => set(["items", id, "isLoading"], false);

const itemReducer = {
  [GET_ITEMS_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [GET_ITEMS_SUCCESS] : (state, action) => {
    const { data, collectionName } = action.payload;
    const setData                  = compose(
      merge(collectionName, data),
      loaded(collectionName),
    );
    return setData(state);
  },
  [GET_ITEMS_FAILURE] : (state, action) => setFailure(action.payload, state),

  [GET_ITEM_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [GET_ITEM_SUCCESS] : (state, action) => {
    const { data, collectionName } = action.payload;
    const { id }                   = data;
    const setData                  = compose(
      set(["items", id], data, collectionName),
      loaded(collectionName),
    );
    return setData(state);
  },
  [GET_ITEM_FAILURE] : (state, action) => setFailure(action.payload, state),

  [DELETE_ITEM_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [DELETE_ITEM_SUCCESS] : (state, action) => {
    const { collectionName, id, message } = action.payload;
    const setData                         = compose(
      setMessage(message),
      unset(["items", id], collectionName),
      loaded(collectionName)
    );
    return setData(state);
  },
  [DELETE_ITEM_FAILURE] : (state, action) => setFailure(action.payload, state),

  [UPDATE_ITEM_REQUEST] : (state, action) => {
    const { id, collectionName } = action.payload;
    return compose(
      setLoadingByID(id)(collectionName),
      loading(collectionName),
    )(state);
  },
  [UPDATE_ITEM_SUCCESS] : (state, action) => {
    const { id, data, message, collectionName } = action.payload;
    const setData                               = compose(
      setMessage(message),
      setLoadedByID(collectionName),
      set(["items", id], data, collectionName),
      loaded(collectionName)
    );
    return setData(state);
  },
  [UPDATE_ITEM_FAILURE] : (state, action) => setFailure(action.payload, state),

  [ADD_ITEM_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [ADD_ITEM_SUCCESS] : (state, action) => {
    const { collectionName, data, message } = action.payload;
    const { id }                            = data;
    const setData                           = compose(
      setMessage(message),
      set(["items", id], data, collectionName),
      loaded(collectionName),
    );
    return setData(state);
  },
  [ADD_ITEM_FAILURE] : (state, action) => setFailure(action.payload, state),
};

export default itemReducer;
