import { handleActions } from "redux-actions";
import {
  SET_EDIT_FLAG, CLEAR_EDIT_FLAG, EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDITOR_SUCCESS, EDITOR_FAILURE,
  EDITOR_REQUEST, ADD_FIELD, EDIT_SCHEMA_FAILURE, EDIT_SCHEMA_REQUEST, EDIT_SCHEMA_SUCCESS
} from "./types";

const initialState = {
  // Object of objects with key as the template id
  primaryKey  : "fieldName",
  isLoading   : false,
  error       : {},
  selectedRow : null,
  msg         : "",
};

const reducer = handleActions({
  [EDITOR_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [EDITOR_SUCCESS] : (state, action) => ({
    ...state,
    ...action.payload.data,
    isLoading : false,
  }),
  [EDITOR_FAILURE] : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),

  [EDIT_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [EDIT_SUCCESS] : (state, action) => ({
    ...state,
    msg       : action.payload.data,
    isLoading : false,
  }),
  [EDIT_FAILURE] : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),

  [ADD_FIELD] : (state, action) => {
    const { field } = action.payload;

    // adds displayText placeholder Keys
    // these will be replaced by actual data from the db later
    field.displayText = field.fieldName;
    if (Array.isArray(field.fieldSchema) && (field.fieldSchema.length !== 0)) {
      field.fieldSchema.forEach(f => { f.displayText = f.fieldName });
    }

    const { primaryKey } = state;
    const idx = state.userSchema.findIndex(f => f[primaryKey] === field[primaryKey]);

    if (idx === -1) {
      return {
        ...state,
        userSchema : [
          ...state.userSchema
            .slice(0, idx + 1)
            .concat(state.userSchema.slice(idx + 1), [field]),
        ],
      };
    }

    return {
      ...state,
      error : {
        msg : "Field exists already. Check the Field Name input.",
      },
    };
  },

  [SET_EDIT_FLAG]   : (state, action) => {
    const { row } = action.payload;
    const { fields } = state.data;
    const { primaryKey } = state;
    const rowId = fields.findIndex(field => row[primaryKey].val === field[primaryKey].val);

    return {
      ...state,
      selectedRow : rowId.toString(),
    };
  },
  [CLEAR_EDIT_FLAG] : state => ({
    ...state,
    selectedRow : null,
  }),

  [EDIT_SCHEMA_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [EDIT_SCHEMA_SUCCESS] : (state, action) => ({
    ...state,
    ...action.payload.data,
    isLoading : false,
  }),
  [EDIT_SCHEMA_FAILURE] : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),
}, initialState);

export default reducer;
