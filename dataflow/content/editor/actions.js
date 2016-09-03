import { createAction } from "redux-actions";
import { CALL_API } from "../../middleware/callAPI";
import {
  EDITOR_REQUEST, EDITOR_SUCCESS, EDITOR_FAILURE, EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_SCHEMA_REQUEST,
  EDIT_SCHEMA_SUCCESS, EDIT_SCHEMA_FAILURE, ADD_FIELD
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

function _updateTemplateSchema(params) {
  return {
    [CALL_API] : {
      types    : [EDIT_SCHEMA_REQUEST, EDIT_SCHEMA_SUCCESS, EDIT_SCHEMA_FAILURE],
      callback : api.updateTemplateSchema(params),
    },
  };
}

export const editTemplate = params => (dispatch) =>
  dispatch(_updateTemplate(params))
    .then(dispatch(loadEditor(params)));

export const editTemplateSchema = params => (dispatch) =>
  dispatch(_updateTemplateSchema(params))
    .then(dispatch(loadEditor(params)));

export const addField = createAction(ADD_FIELD, field => ({ field }));
