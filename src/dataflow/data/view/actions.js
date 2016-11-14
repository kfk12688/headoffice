import fetch from "../../fetchWrapper";
import { createAction } from "redux-actions";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, UPDATE_ROW_REQUEST,
  UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, DELETE_ROW_FAILURE, DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS
} from "./types";

/**
 * Get the available data for the requested template
 */
const dataRequest = createAction(DATA_REQUEST);
const dataSuccess = createAction(DATA_SUCCESS, (collectionName, data) => ({ collectionName, data }));
const dataFailure = createAction(DATA_FAILURE, (collectionName, err) => ({ collectionName, err }));

export function loadData(collectionName, query) {
  return dispatch => {
    dispatch(dataRequest);

    const { page, limit } = query;
    return fetch("GET", `api/collections/${collectionName}?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => dispatch(dataSuccess(collectionName, data)))
      .catch(err => dispatch(dataFailure(collectionName, err)));
  };
}

/**
 * Get the template specification
 */
const specRequest = createAction(SPEC_REQUEST);
const specSuccess = createAction(SPEC_SUCCESS, (collectionName, spec) => ({ collectionName, spec }));
const specFailure = createAction(SPEC_FAILURE, (collectionName, err) => ({ collectionName, err }));

export function loadSpec(collectionName) {
  return dispatch => {
    dispatch(specRequest);

    return fetch("GET", `api/templates/${collectionName}/schema`)
      .then(res => res.json())
      .then(spec => dispatch(specSuccess(collectionName, spec)))
      .catch(err => dispatch(specFailure(collectionName, err)));
  };
}

/**
 * Update an existing row in the collection
 */
const updateRowRequest = createAction(UPDATE_ROW_REQUEST);
const updateRowSuccess = createAction(UPDATE_ROW_SUCCESS, data => ({ data }));
const updateRowFailure = createAction(UPDATE_ROW_FAILURE, err => err);

export function updateRow(collectionName, id, data) {
  return dispatch => {
    dispatch(updateRowRequest());

    return fetch("PUT", `api/collections/${collectionName}/${id}`, { data })
      .then(res => res.json())
      .then(row => dispatch(updateRowSuccess(row)))
      .catch(err => dispatch(updateRowFailure(err)));
  };
}

/**
 * Delete an existing row from the collection
 */
const deleteRowRequest = createAction(DELETE_ROW_REQUEST);
const deleteRowSuccess = createAction(DELETE_ROW_SUCCESS, data => data);
const deleteRowFailure = createAction(DELETE_ROW_FAILURE, err => err);

export function deleteRow(collectionName, id) {
  return dispatch => {
    dispatch(deleteRowRequest());

    return fetch("DELETE", `api/collections/${collectionName}/${id}`)
      .then(res => res.json())
      .then(row => dispatch(deleteRowSuccess(row)))
      .catch(err => dispatch(deleteRowFailure(err)));
  };
}
