import { handleActions } from "redux-actions";
import * as type from "./types";

const initialState = {
  data         : {},
  isLoading    : false,
  error        : {},
};

const local = handleActions({
  [type.CONTENT_REQUEST]         : (state) => ({
    ...state,
    isLoading : true,
  }),
  [type.CONTENT_SUCCESS]         : (state, action) => {
    return {
      ...state,
      isLoading : false,
      data      : action.payload.data,
    };
  },
  [type.CONTENT_FAILURE]         : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
  [type.TEMPLATE_CREATE_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [type.TEMPLATE_CREATE_SUCCESS] : (state, action) => {
    return {
      ...state,
      isLoading : false,
      msg       : action.payload.data,
    };
  },
  [type.TEMPLATE_CREATE_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
  [type.TEMPLATE_DELETE_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [type.TEMPLATE_DELETE_SUCCESS] : (state, action) => {
    return {
      ...state,
      isLoading : false,
      msg       : action.payload.data,
    };
  },
  [type.TEMPLATE_DELETE_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
}, initialState);

export default local;
