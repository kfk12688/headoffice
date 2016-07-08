/**
 * Created by sharavan on 15/06/16.
 */
import { createAction } from "redux-actions";
import * as t from "./types";

export const toggleMenuSidebar = createAction(t.TOGGLE_MENU_SIDEBAR);
export const clearMenuState = createAction(t.CLEAR_MENU_STATE);
