import { getWorkbooks, createWorkbook, removeWorkbook } from "./apiActions";
import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";

/**
 * Get the list of workbooks
 */
export const loadWorkbooks = () => dispatch => {
  dispatch(clearFilterState());
  dispatch(clearMenuState());
  return dispatch(getWorkbooks());
};

/**
 * Add a new user to the app
 */
export const addNewWorkbook = params => dispatch => {
  dispatch(createWorkbook(params))
    .then(dispatch(loadWorkbooks()));
};

/**
 * Delete the user from the app
 */
export const deleteWorkbook = params => dispatch => {
  let promise = null;

  if (Array.isArray(params.id)) {
    promise = params.id.map(id => dispatch(removeWorkbook({ id })));
    promise = Promise.all(promise);
  } else {
    promise = dispatch(removeWorkbook(params));
  }

  promise.then(dispatch(loadWorkbooks()));
};
