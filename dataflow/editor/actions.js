import { createAction } from "redux-actions";
import { CALL_API } from "../middleware/callAPI";
import {
  SET_EDIT_FLAG, CLEAR_EDIT_FLAG, EDITOR_REQUEST, EDITOR_SUCCESS, EDITOR_FAILURE, EDIT_FAILURE,
  EDIT_REQUEST, EDIT_SUCCESS
} from "./types";
import { populate as populateForm } from "../form/actions";
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

// Actions that control the embedded form in TemplateViewer_Editor --> EntryGrid
const _setEditFlag = createAction(SET_EDIT_FLAG, row => ({ row }));
export const editRow = row => dispatch => {
  dispatch(_setEditFlag(row));
  dispatch(populateForm(row));
};
export const clearEditFlag = createAction(CLEAR_EDIT_FLAG);

// Deletes a row from the db
export const deleteRow = row => dispatch => {
};
