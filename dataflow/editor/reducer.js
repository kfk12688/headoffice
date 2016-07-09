/**
 * Created by sharavan on 15/06/16.
 */
import { handleActions } from "redux-actions";
import * as t from "./types";

const initialState = {
  // Object of objects with key as the template id
  data      : {},
  isLoading : false,
  error     : {},
  msg       : "",
};

const reducer = handleActions({
  [t.EDITOR_REQUEST] : (state, action) => ({
    ...state,
    isLoading : true,
  }),
  [t.EDITOR_SUCCESS] : (state, action) => ({
    ...state,
    data      : action.payload.data,
    isLoading : false,
  }),
  [t.EDITOR_FAILURE] : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),
  [t.TEMPLATE_EDIT_REQUEST] : (state, action) => ({
    ...state,
    isLoading : true,
  }),
  [t.TEMPLATE_EDIT_SUCCESS] : (state, action) => ({
    ...state,
    msg       : action.payload.data,
    isLoading : false,
  }),
  [t.TEMPLATE_EDIT_FAILURE] : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),
}, initialState);

export default reducer;
