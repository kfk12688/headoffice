/**
 * Created by sharavan on 16/06/16.
 */
import moment from "moment";
import * as dgData from "../data/datagrid";
import { contentActions } from "../actions/contentAC";

const contentState = {
  data         : dgData.data,
  selectedKeys : [],
  filters      : {
    dateModifiedStart : moment.invalid(),
    dateModifiedEnd   : moment.invalid(),
    owner             : undefined,
    isStarred         : false,
    isRecent          : false,
    sortKey           : "updatedAt",
    sortAscending     : false,
  },
};

function toggleRowSelection(state, action) {
  const idx = state.selectedKeys.findIndex((key) => key === action.key);
  let selectedKeys = [];

  if (idx === -1) {
    selectedKeys = state.selectedKeys
      .slice(0, idx + 1)
      .concat([action.key], state.selectedKeys.slice(idx + 1));
  } else {
    selectedKeys = state.selectedKeys
      .slice(0, idx)
      .concat(state.selectedKeys.slice(idx + 1));
  }

  return {
    ...state,
    selectedKeys,
  };
}

const contentReducer = (state = contentState, action) => {
  switch (action.type) {
    case contentActions.SORT_COLUMN:
      return {
        ...state,
        // filteredKeys,
        filters : {
          ...state.filters,
          sortKey       : action.sortKey,
          sortAscending : (action.sortOrder === "asc"),
        },
      };

    case contentActions.TOGGLE_ROW:
      return toggleRowSelection(state, action);

    case contentActions.SELECT_ALL_ROWS:
      return {
        ...state,
        selectedKeys : Object.keys(state.data),
      };

    case contentActions.CLEAR_ROW_SELECTION:
      return {
        ...state,
        selectedKeys : [],
      };

    case contentActions.FILTER.SET_DATE_MODIFIED_START:
      return {
        ...state,
        filters : {
          ...state.filters,
          dateModifiedStart : action.date,
        },
      };

    case contentActions.FILTER.SET_DATE_MODIFIED_END:
      return {
        ...state,
        filters : {
          ...state.filters,
          dateModifiedEnd : action.date,
        },
      };

    case contentActions.FILTER.SET_IS_RECENT:
      return {
        ...state,
        filters : {
          ...state.filters,
          isRecent : action.flag,
        },
      };

    case contentActions.FILTER.SET_IS_STARRED:
      return {
        ...state,
        filters : {
          ...state.filters,
          isStarred : action.flag,
        },
      };

    case contentActions.FILTER.SET_OWNER:
      return {
        ...state,
        filters : {
          ...state.filters,
          owner : action.owner,
        },
      };

    default:
      return state;
  }
};

export default contentReducer;
