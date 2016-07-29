import moment from "moment";
import * as t from "./types";
import { createAction } from "redux-actions";

export const sortFilter = createAction(t.SORT_FILTER, (sortKey, sortOrder) => ({
  sortKey,
  sortOrder,
}));

/**
 * Content Filter Values
 */
export const setFilterDtModStart = createAction(t.SET_FILTER_DTMOD_START, (e) => ({
  date : moment(e.target.value, "YYYY-MM-DD"),
}));
export const setFilterDtModEnd = createAction(t.SET_FILTER_DTMOD_END, (e) => ({
  date : moment(e.target.value, "YYYY-MM-DD"),
}));
export const setFilterOwner = createAction(t.SET_FILTER_OWNER, (e) => ({
  owner : e.target.value,
}));
export const setFilterIsRecent = createAction(t.SET_FILTER_IS_RECENT, (e) => ({
  flag : e.target.checked,
}));
export const setFilterIsStarred = createAction(t.SET_FILTER_IS_STARRED, (e) => ({
  flag : e.target.checked,
}));

/**
 * User Filter Values
 */
export const setFilterUsername = createAction(t.SET_FILTER_USERNAME, (e) => ({
  username : e.target.value,
}));
export const setFilterHasRole = createAction(t.SET_FILTER_HAS_ROLE, (e) => ({
  hasRole : e.target.value,
}));
export const setFilterLastSignIn = createAction(t.SET_FILTER_LAST_SIGN_IN, (e) => ({
  lastSignIn : moment(e.target.value, "YYYY-MM-DD"),
}));

/**
 * Clears the entire filter store
 */
export const clearFilterState = createAction(t.CLEAR_FILTER_STATE);
