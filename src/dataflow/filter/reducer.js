import { handleActions } from "redux-actions";
import {
  SET_DTMOD_END, SET_DTMOD_START, SET_HAS_ROLE, SET_IS_RECENT, SET_IS_STARRED, SET_LAST_SIGN_IN, SET_OWNER,
  SET_USER_NAME, SORT, CLEAR_STATE, SET_WORKBOOK_NAME
} from "./types";

const initialState = {
  sortAscending : false,
  sortKey : "",
};

const reducer = handleActions({
  [SORT] : (state, action) => ({
    ...state,
    sortKey       : action.payload.sortKey,
    sortAscending : (action.payload.sortOrder === "asc"),
  }),

  /**
   * Template Filter Reducer
   */
  [SET_DTMOD_START] : (state, action) => ({
    ...state,
    dateModifiedStart : action.payload.date,
  }),
  [SET_DTMOD_END]   : (state, action) => ({
    ...state,
    dateModifiedEnd : action.payload.date,
  }),
  [SET_IS_RECENT]   : (state, action) => ({
    ...state,
    isRecent : action.payload.flag,
  }),
  [SET_IS_STARRED]  : (state, action) => ({
    ...state,
    isStarred : action.payload.flag,
  }),
  [SET_OWNER]       : (state, action) => ({
    ...state,
    owner : action.payload.owner,
  }),

  /**
   * User Filter Reducer
   */
  [SET_USER_NAME]    : (state, action) => ({
    ...state,
    username : action.payload.username,
  }),
  [SET_LAST_SIGN_IN] : (state, action) => ({
    ...state,
    lastSignIn : action.payload.lastSignIn,
  }),
  [SET_HAS_ROLE]     : (state, action) => ({
    ...state,
    hasRole : action.payload.hasRole,
  }),

  /**
   * Workbook Filter Reducer
   */
  [SET_WORKBOOK_NAME] : (state, action) => ({
    ...state,
    workbookName : action.payload.workbookName,
  }),
  /**
   * Reducer to clear the entire filter store
   */

  [CLEAR_STATE] : () => initialState,
}, initialState);

export default reducer;
