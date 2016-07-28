/**
 * Created by sharavan on 15/06/16.
 */
import { handleActions } from "redux-actions";
import * as type from "./types";

const initialState = {
  data         : {},
  isLoading    : false,
  selectedKeys : [],
  error        : {},
};

function toggleRowSelection(state, action) {
  const { payload } = action;
  const { key } = payload;

  const idx = state.selectedKeys.findIndex((k) => k === key);
  let selectedKeys = [];

  if (idx === -1) {
    selectedKeys = state.selectedKeys
      .slice(0, idx + 1)
      .concat([key], state.selectedKeys.slice(idx + 1));
  } else {
    selectedKeys = state.selectedKeys
      .slice(0, idx)
      .concat(state.selectedKeys.slice(idx + 1));
  }

  return {
    ...state,
    selectedKeys,
  };
}

const local = handleActions({
  [type.SELECT_ALL_CONTENT]      : (state) => ({
    ...state,
    selectedKeys : Object.keys(state.data),
  }),
  [type.CLEAR_CONTENT_SELECTION] : (state) => ({
    ...state,
    selectedKeys : [],
  }),
  [type.TOGGLE_CONTENT]          : (state, action) => toggleRowSelection(state, action),
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
