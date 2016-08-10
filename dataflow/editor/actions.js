import { createAction } from "redux-actions";
import { CALL_API } from "../middleware/callAPI";
import {
  EDITOR_REQUEST, EDITOR_SUCCESS, EDITOR_FAILURE, EDIT, DELETE, ERROR, EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS
} from "./types";
import * as api from "./api";

// Async Actions
function _getTemplate(params) {
  return {
    [CALL_API] : {
      types    : [EDITOR_REQUEST, EDITOR_SUCCESS, EDITOR_FAILURE],
      callback : api.getTemplate(params),
    },
  };
}

export const loadEditor = params => (dispatch) =>
  dispatch(_getTemplate(params));

function _updateTemplate(params) {
  return {
    [CALL_API] : {
      types    : [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE],
      callback : api.updateTemplate(params),
    },
  };
}

export const editTemplate = params => (dispatch) =>
  dispatch(_updateTemplate(params))
    .then(dispatch(loadEditor(params)));

export const editRow = createAction(EDIT, row => ({
  row,
}));

export const deleteRow = createAction(DELETE, data => ({
  id : "testid",
}));

export const error = createAction(ERROR);
