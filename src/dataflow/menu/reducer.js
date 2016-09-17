/**
 * Created by sharavan on 15/06/16.
 */
import { handleActions } from "redux-actions";
import * as t from "./types";

const initialState = {
  showSidebar  : true,
  selectedKeys : [],
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
  [t.SELECT_ALL_CONTENT]      : (state, action) => ({
    ...state,
    selectedKeys : action.payload.keys,
  }),
  [t.CLEAR_CONTENT_SELECTION] : (state) => ({
    ...state,
    selectedKeys : [],
  }),
  [t.TOGGLE_CONTENT]          : (state, action) => toggleRowSelection(state, action),
  [t.TOGGLE_MENU_SIDEBAR]     : (state) => ({
    ...state,
    showSidebar : !state.showSidebar,
  }),
  [t.CLEAR_MENU_STATE]        : () => initialState,
}, initialState);

export default reducer;
