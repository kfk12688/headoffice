/**
 * Created by sharavan on 15/06/16.
 */
import { handleActions } from "redux-actions";
import * as t from "./types";

const initialState = {
  // Object of objects with key as the template id
  data      : {},
  postData  : {
    data : {},
    idx  : -1,
  },
  isLoading : false,
  error     : {},
  msg       : "",
};

const reducer = handleActions({
  [t.EDITOR_REQUEST]           : (state) => ({
    ...state,
    isLoading : true,
  }),
  [t.EDITOR_SUCCESS]           : (state, action) => ({
    ...state,
    data      : action.payload.data,
    isLoading : false,
  }),
  [t.EDITOR_FAILURE]           : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),
  [t.TEMPLATE_EDIT_REQUEST]    : (state) => ({
    ...state,
    isLoading : true,
  }),
  [t.TEMPLATE_EDIT_SUCCESS]    : (state, action) => ({
    ...state,
    msg       : action.payload.data,
    isLoading : false,
  }),
  [t.TEMPLATE_EDIT_FAILURE]    : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),
  [t.TEMPLATE_EDIT_ROW]        : (state, action) => {
    const { data } = action.payload;
    const { fields } = state.data;
    const idx = fields.findIndex(field => data.fieldName.val === field.fieldName.val);

    return {
      ...state,
      postData : {
        fields : data,
        idx,
      },
    };
  },
  [t.TEMPLATE_DELETE_ROW]      : (state) => {
    return {
      ...state,
    };
  },
  [t.TEMPLATE_DUPLICATE_ERROR] : (state) => ({
    ...state,
    msg : "Duplicate data entered. Primary Keys are the same",
  }),
}, initialState);

export default reducer;
