/**
 * Created by sharavan on 16/06/16.
 */
import moment from "moment";
import * as t from "./types";
import { createAction } from "redux-actions";

// Synchronous actions
const sortFilter = createAction(t.SORT_FILTER, (sortKey, sortOrder) => ({
  sortKey,
  sortOrder,
}));

/**
 * Search Handlers
 */
const setFilterDtModStart = createAction(t.SET_FILTER_DTMOD_START, (e) => ({
  date : moment(e.target.value, "YYYY-MM-DD"),
}));
const setFilterDtModEnd = createAction(t.SET_FILTER_DTMOD_END, (e) => ({
  date : moment(e.target.value, "YYYY-MM-DD"),
}));
const setFilterOwner = createAction(t.SET_FILTER_OWNER, (e) => ({
  owner : e.target.value,
}));
const setFilterIsRecent = createAction(t.SET_FILTER_IS_RECENT, (e) => ({
  flag : e.target.checked,
}));
const setFilterIsStarred = createAction(t.SET_FILTER_IS_STARRED, (e) => ({
  flag : e.target.checked,
}));
const clearFilterState = createAction(t.CLEAR_FILTER_STATE);

// exporting synchronous functions
export { sortFilter };
export {
  setFilterDtModEnd, setFilterDtModStart, setFilterIsRecent, setFilterIsStarred, setFilterOwner, clearFilterState
};
