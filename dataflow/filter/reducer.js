/**
 * Created by sharavan on 15/06/16.
 */
import { handleActions } from "redux-actions";
import * as t from "./types";

const reducer = handleActions({
  [t.SORT_FILTER]            : (state, action) => ({
    ...state,
    sortKey       : action.payload.sortKey,
    sortAscending : (action.payload.sortOrder === "asc"),
  }),
  [t.SET_FILTER_DTMOD_START] : (state, action) => ({
    ...state,
    dateModifiedStart : action.payload.date,
  }),
  [t.SET_FILTER_DTMOD_END]   : (state, action) => ({
    ...state,
    dateModifiedEnd : action.payload.date,
  }),
  [t.SET_FILTER_IS_RECENT]   : (state, action) => ({
    ...state,
    isRecent : action.payload.flag,
  }),
  [t.SET_FILTER_IS_STARRED]  : (state, action) => ({
    ...state,
    isStarred : action.payload.flag,
  }),
  [t.SET_FILTER_OWNER]       : (state, action) => ({
    ...state,
    isRecent : action.payload.owner,
  }),
  [t.CLEAR_FILTER_STATE]     : () => ({}),
}, {});

export default reducer;
