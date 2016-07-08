import { handleActions } from "redux-actions";
import * as t from "./types";

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

const reducer = handleActions({
  [t.SELECT_ALL_USER]      : (state) => ({
    ...state,
    selectedKeys : Object.keys(state.data),
  }),
  [t.CLEAR_USER_SELECTION] : (state) => ({
    ...state,
    selectedKeys : [],
  }),
  [t.TOGGLE_USER]          : (state, action) => toggleRowSelection(state, action),
  [t.USER_REQUEST]         : (state) => ({
    ...state,
    isLoading : true,
  }),
  [t.USER_SUCCESS]         : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [t.USER_FAILURE]         : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
}, initialState);

export default reducer;
