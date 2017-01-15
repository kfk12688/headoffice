import { createAction } from "redux-actions";
import { SELECT_ALL_CONTENT, DESELECT_ALL_CONTENT, TOGGLE_CONTENT_SELECTION } from "./types";

export const selectAll       = createAction(SELECT_ALL_CONTENT);
export const delselectAll    = createAction(DESELECT_ALL_CONTENT);
export const toggleSelection = createAction(TOGGLE_CONTENT_SELECTION, collectionName => ({ collectionName }));
