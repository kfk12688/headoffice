import R from "ramda";
import { handleActions } from "redux-actions";
import {
  EDIT_SCHEMA_SUCCESS, EDIT_TEMPLATE_FAILURE, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, EDIT_SCHEMA_FAILURE,
  EDIT_SCHEMA_REQUEST, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST,
  ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_FAILURE, GET_TEMPLATE_REQUEST, GET_TEMPLATE_SUCCESS, GET_TEMPLATE_FAILURE, ADD_USER_SCHEMA_FIELD,
  STAR_TEMPLATE_SUCCESS
} from "./types";

const get         = R.curry((key, state) => R.compose(R.clone, R.prop(key))(state));
const setAndMerge = R.curry((key, value, name, state, obj) => {
  const i1 = R.assocPath([key], value, obj);
  return R.assocPath([name], i1, state);
});

const loadingState = R.curry((name, state) =>
  R.compose(setAndMerge("isLoading", true, name, state), get(name))(state));
const loadingList  = loadingState("list");

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
    return {
      ...state,
      list : {
        isLoading : false,
        data      : templates,
      },
    };
  },
  [GET_TEMPLATES_FAILURE] : (state, action) => {},

  [ADD_TEMPLATE_REQUEST] : (state, action) => {},
  [ADD_TEMPLATE_SUCCESS] : (state, action) => {
    const { template } = action.payload;
    return {
      ...state,
      list : {
        ...state.list,
        data      : {
          ...state.list.data,
          [template.id] : template,
        },
        isLoading : false,
      },
    };
  },
  [ADD_TEMPLATE_FAILURE] : (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      isLoading : false,
      list      : {
        ...state.list,
        error,
      },
    };
  },

  [EDIT_TEMPLATE_REQUEST] : (state, action) => {
    const { collectionName } = action.payload;
    return R.compose(loadingState(collectionName), loadingList)(state);
  },
  [EDIT_TEMPLATE_SUCCESS] : (state, action) => {
    const { collectionName, template } = action.payload;
    return {
      ...state,
      list             : {
        ...state.list,
        data      : {
          ...state.list.data,
          [template.id] : template,
        },
        isLoading : false,
      },
      [collectionName] : {
        ...state[collectionName],
        ...template,
        isLoading : false,
      },
    };
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

  [GET_TEMPLATE_REQUEST] : (state, action) => {
    const { collectionName } = action.payload;
    return R.compose(loadingState(collectionName), loadingList)(state);
  },
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

  [EDIT_SCHEMA_REQUEST] : (state, action) => {
    const { collectionName } = action.payload;
    return R.compose(loadingState(collectionName), loadingList)(state);
  },
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
