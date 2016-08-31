import {
  SET_DTMOD_END, SET_DTMOD_START, SET_HAS_ROLE, SET_IS_RECENT, SET_IS_STARRED, SET_LAST_SIGN_IN, SET_OWNER,
  SET_USER_NAME, SORT, CLEAR_STATE, SET_WORKBOOK_NAME
} from "./types";
import { createAction } from "redux-actions";

export const sortFilter = createAction(SORT, (sortKey, sortOrder) => ({
  sortKey,
  sortOrder,
}));

/**
 * Content Filter Values
 */
export const setDateModifiedStart = createAction(SET_DTMOD_START, value => ({
  date : value,
}));
export const setDateModifiedEnd = createAction(SET_DTMOD_END, value => ({
  date : value,
}));
export const setOwner = createAction(SET_OWNER, value => ({
  owner : value,
}));
export const setIsRecent = createAction(SET_IS_RECENT, (e) => ({
  flag : e.target.checked,
}));
export const setIsStarred = createAction(SET_IS_STARRED, (e) => ({
  flag : e.target.checked,
}));

/**
 * User Filter Values
 */
export const setUserName = createAction(SET_USER_NAME, value => ({
  username : value,
}));
export const setUserHasRole = createAction(SET_HAS_ROLE, value => ({
  hasRole : value,
}));
export const setLastSignIn = createAction(SET_LAST_SIGN_IN, (value) => ({
  lastSignIn : value,
}));

/**
 * Workbook Filter Values
 */
export const setWorkbookName = createAction(SET_WORKBOOK_NAME, value => ({
  workbookName : value,
}));

/**
 * Clears the entire filter store
 */
export const clearFilterState = createAction(CLEAR_STATE);
