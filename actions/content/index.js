/**
 * Created by sharavan on 16/06/16.
 */
import moment from "moment";

const contentActions = {
  SORT_COLUMN         : "SORT_COLUMN",
  TOGGLE_ROW          : "TOGGLE_ROW",
  SELECT_ALL_ROWS     : "SELECT_ALL_ROWS",
  CLEAR_ROW_SELECTION : "CLEAR_ROW_SELECTION",
  FILTER              : {
    SET_DATE_MODIFIED_START : "SET_DATE_MODIFIED_START",
    SET_DATE_MODIFIED_END   : "SET_DATE_MODIFIED_END",
    SET_OWNER               : "SET_OWNER",
    SET_IS_RECENT           : "SET_IS_RECENT",
    SET_IS_STARRED          : "SET_IS_STARRED",
  },
};

const sortColumn = (sortKey, sortOrder) => {
  return {
    type : contentActions.SORT_COLUMN,
    sortKey,
    sortOrder,
  };
};

const toggleRow = (key) => {
  return {
    type : contentActions.TOGGLE_ROW,
    key,
  };
};

const selectAllRows = () => {
  return {
    type : contentActions.SELECT_ALL_ROWS,
  };
};

const clearRowSelection = () => {
  return {
    type : contentActions.CLEAR_ROW_SELECTION,
  };
};

/**
 * Search Handlers
 */
const setDateModifiedStart = (e) => {
  return {
    type : contentActions.FILTER.SET_DATE_MODIFIED_START,
    date : moment(e.target.value, "YYYY-MM-DD"),
  };
};

const setDateModifiedEnd = (e) => {
  return {
    type : contentActions.FILTER.SET_DATE_MODIFIED_END,
    date : moment(e.target.value, "YYYY-MM-DD"),
  };
};

const setOwner = (e) => {
  return {
    type  : contentActions.FILTER.SET_OWNER,
    owner : e.target.value,
  };
};

const setIsRecent = (e) => {
  return {
    type : contentActions.FILTER.SET_IS_RECENT,
    flag : e.target.checked,
  };
};

const setIsStarred = (e) => {
  return {
    type : contentActions.FILTER.SET_IS_STARRED,
    flag : e.target.checked,
  };
};

// exporting action type constants
export { contentActions };
export {
  TEMPLATE_FAILURE, TEMPLATE_REQUEST, TEMPLATE_SUCCESS, CONTENT_FAILURE, CONTENT_REQUEST, CONTENT_SUCCESS
} from "./apiActions";

// exporting synchronous functions
export { sortColumn, toggleRow, selectAllRows, clearRowSelection };
export { setDateModifiedEnd, setDateModifiedStart, setOwner, setIsRecent, setIsStarred };
// exporting asynchronous functions
export { loadContent, loadTemplate } from "./apiActions";
