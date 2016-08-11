import { CALL_API } from "../middleware/callAPI";
import {
  WORKBOOK_REQUEST, WORKBOOK_SUCCESS, WORKBOOK_FAILURE, NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS,
  NEW_WORKBOOK_FAILURE
} from "./types";
import * as api from "./api";
import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";

/**
 * Get the list of workbooks
 */
function _loadWorkbooks() {
  return {
    [CALL_API] : {
      types    : [WORKBOOK_REQUEST, WORKBOOK_SUCCESS, WORKBOOK_FAILURE],
      callback : api.getWorkbooksList(),
    },
  };
}

export function loadWorkbooks() {
  return (dispatch) => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    return dispatch(_loadWorkbooks());
  };
}

/**
 * Add a new user to the app
 */
function _addNewWorkbook(params) {
  return {
    [CALL_API] : {
      types    : [NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS, NEW_WORKBOOK_FAILURE],
      callback : api.addNewWorkbook(params),
    },
  };
}

export function addNewWorkbook(params) {
  return dispatch =>
    dispatch(_addNewWorkbook(params))
      .then(dispatch(loadWorkbooks()));
}

/**
 * Delete the user from the app
 */
function _deleteWorkbook(params) {
  return {
    [CALL_API] : {
      types    : [NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS, NEW_WORKBOOK_FAILURE],
      callback : api.deleteWorkbook(params),
    },
  };
}

export const deleteWorkbook = params => dispatch => {
  let promise = null;

  if (Array.isArray(params.id)) {
    promise = params.id.map(id => dispatch(_deleteWorkbook({ id })));
    promise = Promise.all(promise);
  } else {
    promise = dispatch(_deleteWorkbook(params));
  }

  promise.then(dispatch(loadWorkbooks()));
};
