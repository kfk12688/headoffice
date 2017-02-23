import { compose, set, unset, loaded, loading, loadingCollection, setFailure, setMessage } from "utils";
import { EDIT_TEMPLATE_FAILURE, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, GET_TEMPLATE_REQUEST, GET_TEMPLATE_SUCCESS, GET_TEMPLATE_FAILURE, DELETE_TEMPLATE_FAILURE, STAR_TEMPLATE_SUCCESS } from "./types";

const templateReducer = {
  [GET_TEMPLATES_REQUEST] : (state) => loading("list", state),
  [GET_TEMPLATES_SUCCESS] : (state, action) => {
    const { data } = action.payload;
    const setData  = compose(
      set("data", data, "list"),
      loaded("list")
    );
    return setData(state);
  },
  [GET_TEMPLATES_FAILURE] : (state, action) => setFailure(action.payload, state),

  [GET_TEMPLATE_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [GET_TEMPLATE_SUCCESS] : (state, action) => {
    const { data, collectionName } = action.payload;
    const setData                  = compose(
      loaded(collectionName),
      set(null, data, collectionName),
    );
    return setData(state);
  },
  [GET_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload, state),

  [ADD_TEMPLATE_REQUEST] : (state, action) => loading("list", state),
  [ADD_TEMPLATE_SUCCESS] : (state, action) => {
    const { data, message }             = action.payload;
    const { name }                      = data;
    const setData                       = compose(
      setMessage(message),
      set(null, data, name),
    );
    return setData(state);
  },
  [ADD_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload, state),

  [EDIT_TEMPLATE_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [EDIT_TEMPLATE_SUCCESS] : (state, action) => {
    const { data, collectionName, message } = action.payload;
    const setData                           = compose(
      setMessage(message),
      set(null, data, collectionName),
      loaded(collectionName),
    );
    return setData(state);
  },
  [EDIT_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload, state),

  [DELETE_TEMPLATE_REQUEST] : (state, action) => loading("list", state),
  [DELETE_TEMPLATE_SUCCESS] : (state, action) => {
    const { collectionName, message } = action.payload;
    const deleteTemplate              = compose(
      loaded("list"),
      setMessage(message),
      unset(["data", collectionName], "list"),
      unset(null, collectionName),
    );
    return deleteTemplate(state);
  },
  [DELETE_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload, state),

  [STAR_TEMPLATE_SUCCESS] : (state, action) => {
    const { data, collectionName } = action.payload;
    const isFavorite               = data.isFavorite;
    const setIsFavorite            = compose(
      set("isFavorite", isFavorite, collectionName),
      set(["data", collectionName, "isFavorite"], isFavorite, "list"),
    );
    return setIsFavorite(state);
  },
};

export default templateReducer;
