import R from "ramda";
import { set, unset, loaded, loading, loadCollection, setFailure, setMessage } from "utils";
import {
  EDIT_TEMPLATE_FAILURE, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST,
  DELETE_TEMPLATE_SUCCESS, GET_TEMPLATE_REQUEST, GET_TEMPLATE_SUCCESS, GET_TEMPLATE_FAILURE, DELETE_TEMPLATE_FAILURE,
  STAR_TEMPLATE_SUCCESS
} from "./types";

const templateReducer = {
  [GET_TEMPLATES_REQUEST] : (state) => loading("list", state),
  [GET_TEMPLATES_SUCCESS] : (state, action) => {
    const { templates } = action.payload;
    const setData       = R.compose(
      set("data", templates, "list"),
      loaded("list")
    );
    return setData(state);
  },
  [GET_TEMPLATES_FAILURE] : (state, action) => setFailure(action.payload.error, state),

  [ADD_TEMPLATE_REQUEST] : (state, action) => loading("list", state),
  [ADD_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, message }             = action.payload;
    const { collectionName }                = template;
    const setData                           = R.compose(
      setMessage(message),
      set(null, template, collectionName),
      set(["data", collectionName], template, "list"),
      loaded("list")
    );
    return setData(state);
  },
  [ADD_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload.error, state),

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
  [EDIT_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload.error, state),

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
  [DELETE_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload.error, state),

  // #####################################################

  [GET_TEMPLATE_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [GET_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const setData                      = R.compose(
      loaded("list"),
      loaded(collectionName),
      set(null, template, collectionName),
    );
    return setData(state);
  },
  [GET_TEMPLATE_FAILURE] : (state, action) => setFailure(action.payload.error, state),

  [STAR_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const isFavorite                   = template.isFavorite;
    const setIsFavorite                = R.compose(
      set("isFavorite", isFavorite, collectionName),
      set(["data", collectionName, "isFavorite"], isFavorite, "list"),
    );
    return setIsFavorite(state);
  },
};

export default templateReducer;
