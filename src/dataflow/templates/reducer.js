import R from "ramda";
import { handleActions } from "redux-actions";
import { set, unset, loaded, loading, loadCollection, setError, setMessage } from "utils";
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
const setFailure   = (error, message) => R.compose(
  setMessage(message),
  setError(error),
  loaded("list"),
);

const reducer = handleActions({
  [GET_TEMPLATES_REQUEST] : (state) => loading("list", state),
  [GET_TEMPLATES_SUCCESS] : (state, action) => {
    const { templates } = action.payload;
    const setData       = R.compose(
      set("data", templates, "list"),
      loaded("list")
    );
    return setData(state);
  },
  [GET_TEMPLATES_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

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
  [ADD_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  [EDIT_TEMPLATE_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [EDIT_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName, message } = action.payload;
    const setData                               = R.compose(
      setMessage(message),
      set(collectionName, template, "list"),
      set(["data", collectionName], template, "list"),
      loaded("list"));
    return setData(state);
  },
  [EDIT_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

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
  [DELETE_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

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
  [GET_TEMPLATE_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
  },

  [EDIT_SCHEMA_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [EDIT_SCHEMA_SUCCESS] : (state, action) => {
    const { collectionName, template, message } = action.payload;
    const onEditSuccess                         = R.compose(
      setMessage(message),
      set("userSchema", template.userSchema, collectionName),
      loaded(collectionName),
    );
    return onEditSuccess(state);
  },
  [EDIT_SCHEMA_FAILURE] : (state, action) => {
    const { error, message } = action.payload;
    return setFailure(error, message, state);
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
