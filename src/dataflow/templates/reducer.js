import R from "ramda";
import { handleActions } from "redux-actions";
import { set, unset, loadedState, loadState, loadCollection } from "../utils";
import {
  EDIT_SCHEMA_SUCCESS, EDIT_TEMPLATE_FAILURE, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, EDIT_SCHEMA_FAILURE,
  EDIT_SCHEMA_REQUEST, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST,
  ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_FAILURE, GET_TEMPLATE_REQUEST, GET_TEMPLATE_SUCCESS, GET_TEMPLATE_FAILURE, ADD_USER_SCHEMA_FIELD,
  STAR_TEMPLATE_SUCCESS
} from "./types";

const initialState = {
  list : {
    isLoading : false,
    data      : {},
  },
};

const reducer = handleActions({
  [GET_TEMPLATES_REQUEST] : (state) => loadState("list", state),
  [GET_TEMPLATES_SUCCESS] : (state, action) => {
    const { templates } = action.payload;
    const setData       = R.compose(
      set("data", templates, "list"),
      loadedState("list")
    );
    return setData(state);
  },
  [GET_TEMPLATES_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    const setError           = R.compose(
      set("message", message, "list"),
      set("error", error, "list"),
      loadedState("list")
    );
    return setError(state);
  },

  [ADD_TEMPLATE_REQUEST] : (state, action) => loadState("list", state),
  [ADD_TEMPLATE_SUCCESS] : (state, action) => {
    const { template }             = action.payload;
    const { collectionName }       = template;
    const setData                  = R.compose(
      set(null, template, collectionName),
      set(["data", collectionName], template, "list"),
      loadedState("list")
    );
    return setData(state);
  },
  [ADD_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    const setError           = R.compose(
      set("message", message, "list"),
      set("error", error, "list"),
      loadedState("list")
    );
    return setError(state);
  },

  [EDIT_TEMPLATE_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [EDIT_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const setData                      = R.compose(
      set(collectionName, template, "list"),
      set(["data", collectionName], template, "list"),
      loadedState("list"));
    return setData(state);
  },
  [EDIT_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message, collectionName } = action.payload;
    const setError                           = R.compose(
      set("message", message, collectionName),
      set("error", error, collectionName),
      loadedState(collectionName),
    );
    return setError(state);
  },

  [DELETE_TEMPLATE_REQUEST] : (state, action) => loadState("list", state),
  [DELETE_TEMPLATE_SUCCESS] : (state, action) => {
    const { collectionName } = action.payload;
    const deleteTemplate     = R.compose(
      loadedState("list"),
      unset(["data", collectionName], "list"),
      unset(null, collectionName),
    );
    return deleteTemplate(state);
  },
  [DELETE_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    const setError           = R.compose(
      set("message", message, "list"),
      set("error", error, "list"),
      loadedState("list"),
    );
    return setError(state);
  },

  // #####################################################

  [GET_TEMPLATE_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [GET_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const setData                      = R.compose(
      loadedState("list"),
      loadedState(collectionName),
      set(null, template, collectionName),
    );
    return setData(state);
  },
  [GET_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message, collectionName } = action.payload;
    const setError                           = R.compose(
      set("message", message, collectionName),
      set("error", error, collectionName),
      loadedState(collectionName),
    );
    return setError(state);
  },

  [EDIT_SCHEMA_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [EDIT_SCHEMA_SUCCESS] : (state, action) => {
    const { collectionName, template } = action.payload;
    const onEditSuccess                = R.compose(
      set("userSchema", template.userSchema, collectionName),
      loadedState(collectionName),
    );
    return onEditSuccess(state);
  },
  [EDIT_SCHEMA_FAILURE] : (state, action) => {
    const { collectionName, error } = action.payload;
    const onEditFailure             = R.compose(
      set("error", error, collectionName),
      loadedState(collectionName),
    );
    return onEditFailure(state);
  },

  [STAR_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const isFavorite                   = template.isFavorite;
    const setIsFavorite                = R.compose(
      set("isFavorite", isFavorite, collectionName),
      set(["data", collectionName, "isFavorite"], isFavorite, "list"),
    );
    return setIsFavorite(state);
  },

  [ADD_USER_SCHEMA_FIELD] : (state, action) => {
    const { collectionName, field } = action.payload;

    // adds displayText placeholder Keys
    // these will be replaced by actual data from the db later
    field.displayText = field.fieldName;
    if (Array.isArray(field.fieldSchema) && (field.fieldSchema.length !== 0)) {
      field.fieldSchema.forEach(f => {
        f.displayText = f.fieldName;
      });
    }

    const idx = state[collectionName].userSchema.findIndex(f => f.fieldName === field.fieldName);

    if (idx === -1) {
      return {
        ...state,
        [collectionName] : {
          ...state[collectionName],
          userSchema : [
            ...state[collectionName].userSchema
              .slice(0, idx + 1)
              .concat(state[collectionName].userSchema.slice(idx + 1), [field]),
          ],
        },
      };
    }

    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        error : "Field exists already. Check the Field Name input.",
      },
    };
  },
}, initialState);

export default reducer;
