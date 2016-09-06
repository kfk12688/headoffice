import { CALL_API } from "../../middleware/callAPI";
import {
  GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS,
  ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE
} from "./types";
import * as api from "../api";
import { clearFilterState } from "../../filter/actions";
import { clearMenuState } from "../../menu/actions";

/**
 * Load all the existing templates in the DB
 */
function _loadTemplate() {
  return {
    [CALL_API] : {
      types    : [GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE],
      callback : api.getTemplates(),
    },
  };
}
export function loadTemplate() {
  return (dispatch) => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    dispatch(_loadTemplate());
  };
}

/**
 * Create a new table template
 */
function _addTemplate(params) {
  return {
    [CALL_API] : {
      types    : [ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE],
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
 */
function _deleteTemplate(params) {
  return {
    [CALL_API] : {
      types    : [DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE],
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

    promise.then(dispatch(loadTemplate()));
  };
}
