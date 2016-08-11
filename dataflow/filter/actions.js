import moment from "moment";
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
export const setDateModifiedStart = createAction(SET_DTMOD_START, (e) => ({
  date : moment(e.target.value, "YYYY-MM-DD"),
}));
export const setDateModifiedEnd = createAction(SET_DTMOD_END, (e) => ({
  date : moment(e.target.value, "YYYY-MM-DD"),
}));
export const setOwner = createAction(SET_OWNER, (e) => ({
  owner : e.target.value,
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
export const setUserName = createAction(SET_USER_NAME, (e) => ({
  username : e.target.value,
}));
export const setUserHasRole = createAction(SET_HAS_ROLE, (e) => ({
  hasRole : e.target.value,
}));
export const setLastSignIn = createAction(SET_LAST_SIGN_IN, (e) => ({
  lastSignIn : moment(e.target.value, "YYYY-MM-DD"),
}));

/**
 * Workbook Filter Values
 */
export const setWorkbookName = createAction(SET_WORKBOOK_NAME, (e) => ({
  workbookName : e.target.value,
}));

/**
 * Clears the entire filter store
 */
export const clearFilterState = createAction(CLEAR_STATE);
