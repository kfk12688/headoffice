/**
 * Created by sharavan on 15/06/16.
 */
import { createAction } from "redux-actions";
import * as t from "./types";

export const toggleMenuSidebar = createAction(t.TOGGLE_MENU_SIDEBAR);
export const clearMenuState = createAction(t.CLEAR_MENU_STATE);

export const toggleSelection = createAction(t.TOGGLE_CONTENT, key => ({ key }));
export const selectAll = createAction(t.SELECT_ALL_CONTENT, keys => ({ keys }));
export const clearSelection = createAction(t.CLEAR_CONTENT_SELECTION);
