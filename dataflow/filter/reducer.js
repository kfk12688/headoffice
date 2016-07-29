import { handleActions } from "redux-actions";
import * as t from "./types";

const initialState = {};

const reducer = handleActions({
  [t.SORT_FILTER]            : (state, action) => ({
    ...state,
    sortKey       : action.payload.sortKey,
    sortAscending : (action.payload.sortOrder === "asc"),
  }),

  /**
   * Content Filter Reducer
   */
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
    owner : action.payload.owner,
  }),

  /**
   * User Filter Reducer
   */
  [t.SET_FILTER_USERNAME]         : (state, action) => ({
    ...state,
    username : action.payload.username,
  }),
  [t.SET_FILTER_LAST_SIGN_IN] : (state, action) => ({
    ...state,
    lastSignIn : action.payload.lastSignIn,
  }),
  [t.SET_FILTER_HAS_ROLE]     : (state, action) => ({
    ...state,
    hasRole : action.payload.hasRole,
  }),

  /**
   * Reducer to clear the entire filter store
   */
  [t.CLEAR_FILTER_STATE] : () => initialState,
}, initialState);

export default reducer;
