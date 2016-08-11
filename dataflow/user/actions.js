import { CALL_API } from "../middleware/callAPI";
import * as type from "./types";
import * as api from "./api";
import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";

/**
 * Get the list of users
 */
function _loadUser() {
  return {
    [CALL_API] : {
      types    : [type.USER_REQUEST, type.USER_SUCCESS, type.USER_FAILURE],
      callback : api.getUserList(),
    },
  };
}

export function loadUser() {
  return (dispatch) => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    return dispatch(_loadUser());
  };
}

/**
 * Add a new user to the app
 */
function _addNewUser(params) {
  return {
    [CALL_API] : {
      types    : [type.NEW_USER_REQUEST, type.NEW_USER_SUCCESS, type.NEW_USER_FAILURE],
      callback : api.addNewUser(params),
    },
  };
}

export function addNewUser(params) {
  return dispatch =>
    dispatch(_addNewUser(params))
      .then(dispatch(loadUser()));
}

/**
 * Delete the user from the app
 */
function _deleteUser(params) {
  return {
    [CALL_API] : {
      types    : [type.NEW_USER_REQUEST, type.NEW_USER_SUCCESS, type.NEW_USER_FAILURE],
      callback : api.deleteUser(params),
    },
  };
}

export const deleteUser = params => dispatch => {
  let promise = null;

  if (Array.isArray(params.id)) {
    promise = params.id.map(id => dispatch(_deleteUser({ id })));
    promise = Promise.all(promise);
  } else {
    promise = dispatch(_deleteUser(params));
  }

  promise.then(dispatch(loadUser()));
};
