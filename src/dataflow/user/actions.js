import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";
import { getUsers, createUser, removeUser } from "./apiActions";
import { createAction } from "redux-actions";
import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from "./types";

/**
 * Get the list of users
 */
export const loadUser = () => dispatch => {
  dispatch(clearFilterState());
  dispatch(clearMenuState());
  return dispatch(getUsers());
};

/**
 * Add a new user to the app
 */
export const addNewUser = params => dispatch => {
  dispatch(createUser(params))
    .then(dispatch(loadUser()));
};

/**
 * Delete the user from the app
 */
export const deleteUser = params => dispatch => {
  let promise = null;

  if (Array.isArray(params.id)) {
    promise = params.id.map(id => dispatch(removeUser({ id })));
    promise = Promise.all(promise);
  } else {
    promise = dispatch(removeUser(params));
  }

  promise.then(dispatch(loadUser()));
};

export const addCurrentUser = createAction(ADD_CURRENT_USER, data => ({ data }));
export const removeCurrentUser = createAction(REMOVE_CURRENT_USER);
