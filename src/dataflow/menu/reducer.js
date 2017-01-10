import { handleActions } from "redux-actions";
import {
  TOGGLE_MENU_SIDEBAR, CLEAR_MENU_STATE, TOGGLE_CONTENT, SELECT_ALL_CONTENT, CLEAR_CONTENT_SELECTION
} from "./types";

function toggleRowSelection(state, action) {
  const { key }     = action.payload;
  const idx         = state.selectedKeys.findIndex((k) => k === key);
  let selectedKeys  = [];

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

const initialState = {
  showSidebar  : true,
  selectedKeys : [],
};
const reducer      = handleActions({
  [SELECT_ALL_CONTENT]      : (state, action) => ({
    ...state,
    selectedKeys : action.payload.keys,
  }),
  [CLEAR_CONTENT_SELECTION] : (state) => ({
    ...state,
    selectedKeys : [],
  }),
  [TOGGLE_CONTENT]          : (state, action) => toggleRowSelection(state, action),
  [TOGGLE_MENU_SIDEBAR]     : (state) => ({
    ...state,
    showSidebar : !state.showSidebar,
  }),
  [CLEAR_MENU_STATE]        : () => initialState,
}, initialState);

export default reducer;
