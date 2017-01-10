import R from "ramda";
import { handleActions } from "redux-actions";
import {
  EDIT_SCHEMA_SUCCESS, EDIT_TEMPLATE_FAILURE, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, EDIT_SCHEMA_FAILURE,
  EDIT_SCHEMA_REQUEST, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST,
  ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_FAILURE, GET_TEMPLATE_REQUEST, GET_TEMPLATE_SUCCESS, GET_TEMPLATE_FAILURE, ADD_USER_SCHEMA_FIELD,
  STAR_TEMPLATE_SUCCESS
} from "./types";

const convertToArray    = ar => {
  if (R.is(Array, ar)) return ar;
  return [ar];
};
const set               = R.curry((path, value, root, data) => {
  const mergedPaths = R.concat(convertToArray(root), convertToArray(path));
  return R.assocPath(mergedPaths, value, data);
});
const loadingState      = set("isLoading", true);
const loadingList       = loadingState("list");
const loadingCollection = R.curry((name, state) => {
  return R.compose(loadingState(name), loadingList)(state);
});
const loadedState       = set("isLoading", false);

const initialState = {
  list : {
    isLoading : false,
    data      : {},
  },
};

const reducer = handleActions({
  [GET_TEMPLATES_REQUEST] : (state) => loadingList(state),
  [GET_TEMPLATES_SUCCESS] : (state, action) => {
    const templates = R.prop("templates", action.payload);
    const setData   = R.compose(
      set("data", templates, "list"),
      loadedState("list")
    );
    return setData(state);
  },
  [GET_TEMPLATES_FAILURE] : (state, action) => {
    const error    = R.prop("error", action.payload);
    const message  = R.prop("message", action.payload);
    const setError = R.compose(
      set("message", message, "list"),
      set("error", error, "list"),
      loadedState("list")
    );
    return setError(state);
  },

  [ADD_TEMPLATE_REQUEST] : (state, action) => {},
  [ADD_TEMPLATE_SUCCESS] : (state, action) => {
    const template = R.prop("template", action.payload);
    const id       = R.prop("id", template);
    const setData  = R.compose(
      set(["data", id], template, "list"),
      loadedState("list")
    );
    return setData(state);
  },
  [ADD_TEMPLATE_FAILURE] : (state, action) => {
    const error    = R.prop("error", action.payload);
    const message  = R.prop("message", action.payload);
    const setError = R.compose(
      set("message", message, "list"),
      set("error", error, "list"),
      loadedState("list")
    );
    return setError(state);
  },

  [EDIT_TEMPLATE_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [EDIT_TEMPLATE_SUCCESS] : (state, action) => {
    const collectionName = R.prop("collectionName", action.payload);
    const template = R.prop("template", action.payload);
    const templateID = R.prop("id", template);
    const setData  = R.compose(
      set(collectionName, template, "list"),
      set(["data", templateID], template, "list"),
      loadedState("list"));
    return setData(state);
  },
  [EDIT_TEMPLATE_FAILURE] : (state, action) => {
    const { collectionName, error } = action.payload;
    return {
      ...state,
      list             : {
        ...state.list,
        error,
        isLoading : false,
      },
      [collectionName] : {
        ...state[collectionName],
        error,
        isLoading : false,
      },
    };
  },

  [DELETE_TEMPLATE_REQUEST] : (state, action) => loadingList(state),
  [DELETE_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    delete state.list.data[template.id];
    delete state[collectionName];

    return {
      ...state,
      list : {
        ...state.list,
        isLoading : false,
      },
    };
  },
  [DELETE_TEMPLATE_FAILURE] : (state, action) => {
    const { error } = action.payload;

    return {
      ...state,
      list : {
        ...state.list,
        isLoading : false,
        error,
      },
    };
  },

  // #####################################################

  [GET_TEMPLATE_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [GET_TEMPLATE_SUCCESS] : (state, action) => {
    const { collectionName, template } = action.payload;

    return {
      ...state,
      list             : {
        ...state.list,
        isLoading : false,
      },
      [collectionName] : {
        ...state[collectionName],
        ...template,
        isLoading : false,
      },
    };
  },
  [GET_TEMPLATE_FAILURE] : (state, action) => {
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

  [EDIT_SCHEMA_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [EDIT_SCHEMA_SUCCESS] : (state, action) => {
    const { collectionName, template } = action.payload;
    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        userSchema : template.userSchema,
        isLoading  : false,
      },
    };
  },
  [EDIT_SCHEMA_FAILURE] : (state, action) => {
    const { collectionName, error } = action.payload;
    return {
      ...state,
      [collectionName] : {
        ...state[collectionName],
        error,
        isLoading : false,
      },
    };
  },

  [STAR_TEMPLATE_SUCCESS] : (state, action) => {
    const { template, collectionName } = action.payload;
    const isFavorite                   = template.isFavorite;
    const templateId                   = template.id;

    return {
      ...state,
      list             : {
        ...state.list,
        data : {
          ...state.list.data,
          [templateId] : {
            ...state.list.data[templateId],
            isFavorite,
          },
        },
      },
      [collectionName] : {
        ...state[collectionName],
        isFavorite,
      },
    };
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
