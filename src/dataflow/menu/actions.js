import { createAction } from "redux-actions";
import {
  TOGGLE_MENU_SIDEBAR, CLEAR_MENU_STATE, TOGGLE_CONTENT, SELECT_ALL_CONTENT, CLEAR_CONTENT_SELECTION
} from "./types";

export const toggleMenuSidebar = createAction(TOGGLE_MENU_SIDEBAR);
export const clearMenuState    = createAction(CLEAR_MENU_STATE);

export const toggleSelection = createAction(TOGGLE_CONTENT, key => ({ key }));
export const selectAll       = createAction(SELECT_ALL_CONTENT, keys => ({ keys }));
export const clearSelection  = createAction(CLEAR_CONTENT_SELECTION);
