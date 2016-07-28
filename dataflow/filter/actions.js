import moment from "moment";
import * as t from "./types";
import { createAction } from "redux-actions";

// Synchronous actions
export const sortFilter = createAction(t.SORT_FILTER, (sortKey, sortOrder) => ({
  sortKey,
  sortOrder,
}));

/**
 * Search Handlers
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
export const setFilterUser = createAction(t.SET_FILTER_USER, (e) => ({
  username : e.target.value,
}));
export const setFilterIsRecent = createAction(t.SET_FILTER_IS_RECENT, (e) => ({
  flag : e.target.checked,
}));
export const setFilterIsStarred = createAction(t.SET_FILTER_IS_STARRED, (e) => ({
  flag : e.target.checked,
}));
export const clearFilterState = createAction(t.CLEAR_FILTER_STATE);
