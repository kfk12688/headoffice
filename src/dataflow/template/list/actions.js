import { clearFilterState } from "../../filter/actions";
import { clearMenuState } from "../../menu/actions";
import { getTemplates, removeTemplate, createTemplate, editTemplate } from "./apiActions";

/**
 * Load all the existing templates in the DB
 */
export function loadTemplate() {
  return (dispatch) => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    dispatch(getTemplates());
  };
}

/**
 * Create a new table template
 */
export function addTemplate(params) {
  return (dispatch) =>
    dispatch(createTemplate(params))
      .then(dispatch(loadTemplate()));
}

/**
 * Delete an existing table template from db
 */
export function deleteTemplate(params) {
  return dispatch => {
    let promise = null;

    if (Array.isArray(params.id)) {
      promise = params.id.map(id => dispatch(removeTemplate({ id })));
      promise = Promise.all(promise);
    } else {
      promise = dispatch(removeTemplate(params));
    }

    promise.then(dispatch(loadTemplate()));
  };
}

/**
 * Mark templates as favorites
 */
export function makeFavorite(params) {
  return dispatch => {
    let promise = null;

    if (Array.isArray(params)) {
      promise = params.map(obj => dispatch(editTemplate(obj)));
      promise = Promise.all(promise);
    } else {
      promise = dispatch(editTemplate(params));
    }

    promise.then(dispatch(loadTemplate()));
  };
}
