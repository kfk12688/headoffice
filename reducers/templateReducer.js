/**
 * Created by sharavan on 15/06/16.
 */
import moment from "moment";
import {CONTENT_FAILURE, CONTENT_REQUEST, CONTENT_SUCCESS} from "../actions/content";
import { contentActions, TEMPLATE_FAILURE, TEMPLATE_REQUEST, TEMPLATE_SUCCESS } from "../actions/content";

const contentState = {
  data         : {},
  isLoading    : false,
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
  error        : {
    code : null,
    text : "",
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

const filter = (state, action) => {
  switch (action.type) {
    case contentActions.FILTER.SET_DATE_MODIFIED_START:
      return {
        ...state,
        dateModifiedStart : action.date,
      };

    case contentActions.FILTER.SET_DATE_MODIFIED_END:
      return {
        ...state,
        dateModifiedEnd : action.date,
      };

    case contentActions.FILTER.SET_IS_RECENT:
      return {
        ...state,
        isRecent : action.flag,
      };

    case contentActions.FILTER.SET_IS_STARRED:
      return {
        ...state,
        isStarred : action.flag,
      };

    case contentActions.FILTER.SET_OWNER:
      return {
        ...state,
        owner : action.owner,
      };

    default:
      return state;
  }
};

const template = (state, action) => {
  switch (action.type) {
    case TEMPLATE_SUCCESS:
      return {
        ...state,
        data      : action.response,
        isLoading : false,
      };

    case TEMPLATE_FAILURE:
      return {
        ...state,
        isLoading : false,
        error     : {
          ...state.error,
          text : action.response.error.text,
          code : action.response.error.code,
        },
      };

    case TEMPLATE_REQUEST:
      return {
        ...state,
        isLoading : true,
      };

    default:
      return state;
  }
};

const rootReducer = (state = contentState, action) => {
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
    case contentActions.FILTER.SET_DATE_MODIFIED_END:
    case contentActions.FILTER.SET_IS_RECENT:
    case contentActions.FILTER.SET_IS_STARRED:
    case contentActions.FILTER.SET_OWNER:
      return {
        ...state,
        filters : filter(state.filters, action),
      };

    case TEMPLATE_FAILURE:
    case TEMPLATE_SUCCESS:
    case TEMPLATE_REQUEST:
      return template(state, action);

    default:
      return state;
  }
};

export default rootReducer;
