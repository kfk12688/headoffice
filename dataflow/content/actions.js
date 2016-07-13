import { createAction } from "redux-actions";
import { CALL_API } from "../middleware/callAPI";
import * as type from "./types";
import * as api from "./api";
import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";

// Async Actions
function _loadTemplate() {
  return {
    [CALL_API] : {
      types    : [type.CONTENT_REQUEST, type.CONTENT_SUCCESS, type.CONTENT_FAILURE],
      callback : api.getContentList(),
    },
  };
}

export function loadTemplate(params) {
  return (dispatch) => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    return dispatch(_loadTemplate());
  };
}

/**
 * Create a new table template
 * @param params
 * @returns {{}}
 * @private
 */
function _addTemplate(params) {
  return {
    [CALL_API] : {
      types    : [type.TEMPLATE_CREATE_REQUEST, type.TEMPLATE_CREATE_SUCCESS, type.TEMPLATE_CREATE_FAILURE],
      callback : api.createTemplate(params),
    },
  };
}

export function addTemplate(params) {
  return (dispatch) =>
    dispatch(_addTemplate(params))
      .then(dispatch(loadTemplate()));
}

/**
 * Delete an existing table template from db
 * @param params
 * @returns {{}}
 * @private
 */
function _deleteTemplate(params) {
  return {
    [CALL_API] : {
      types    : [type.TEMPLATE_DELETE_REQUEST, type.TEMPLATE_DELETE_SUCCESS, type.TEMPLATE_DELETE_FAILURE],
      callback : api.deleteTemplate(params),
    },
  };
}

export function deleteTemplate(params) {
  return dispatch => {
    let promise = null;

    if (Array.isArray(params.id)) {
      promise = params.id.map(id => dispatch(_deleteTemplate({ id })));
      promise = Promise.all(promise);
    } else {
      promise = dispatch(_deleteTemplate(params));
    }

    promise.then(dispatch(_loadTemplate(params)));
  };
}

// Sync Actions
const toggleContent = createAction(type.TOGGLE_CONTENT, key => ({ key }));
const selectAllContent = createAction(type.SELECT_ALL_CONTENT);
const clearContentSelection = createAction(type.CLEAR_CONTENT_SELECTION);

export { toggleContent, selectAllContent, clearContentSelection };
