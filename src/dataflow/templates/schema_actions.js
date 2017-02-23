import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import {
  ADD_SCHEMA_REQUEST, ADD_SCHEMA_SUCCESS, ADD_SCHEMA_FAILURE, DELETE_SCHEMA_REQUEST, DELETE_SCHEMA_SUCCESS,
  DELETE_SCHEMA_FAILURE, UPDATE_SCHEMA_REQUEST, UPDATE_SCHEMA_SUCCESS, UPDATE_SCHEMA_FAILURE
} from "./types";

/**
 * Add a schema field to the redux store
 */
const addSchemaRequest = createAction(ADD_SCHEMA_REQUEST, (collectionName) => ({ collectionName }));
const addSchemaSuccess = createAction(ADD_SCHEMA_SUCCESS, (collectionName, data) => ({
  collectionName,
  message : data.message,
  data    : data.data,
}));
const addSchemaFailure = createAction(ADD_SCHEMA_FAILURE, (collectionName, error) => ({ collectionName, error }));
export function addSchema(collectionName, field) {
  return dispatch => {
    dispatch(addSchemaRequest(collectionName));
    return fetch("POST", `api/schema/${collectionName}`, field)
      .then(res => res.json())
      .then(data => dispatch(addSchemaSuccess(collectionName, data)))
      .catch(err => dispatch(addSchemaFailure(collectionName, err)));
  };
}

/**
 * Remove a schema field from the redux store
 */
const deleteSchemaRequest = createAction(DELETE_SCHEMA_REQUEST, (collectionName) => ({ collectionName }));
const deleteSchemaSuccess = createAction(DELETE_SCHEMA_SUCCESS, (collectionName, data) => ({
  collectionName,
  message : data.message,
  data    : data.data,
}));
const deleteSchemaFailure = createAction(DELETE_SCHEMA_FAILURE, (collectionName, error) => ({ collectionName, error }));
export function deleteSchema(collectionName, idx) {
  return dispatch => {
    dispatch(deleteSchemaRequest(collectionName));
    return fetch("DELETE", `api/schema/${collectionName}/${idx}`)
      .then(res => res.json())
      .then(data => dispatch(deleteSchemaSuccess(collectionName, data)))
      .catch(err => dispatch(deleteSchemaFailure(collectionName, err)));
  };
}

/**
 * Remove a schema field from the redux store
 */
const updateSchemaRequest = createAction(UPDATE_SCHEMA_REQUEST, (collectionName) => ({ collectionName }));
const updateSchemaSuccess = createAction(UPDATE_SCHEMA_SUCCESS, (collectionName, data) => ({
  collectionName,
  message : data.message,
  data    : data.data,
}));
const updateSchemaFailure = createAction(UPDATE_SCHEMA_FAILURE, (collectionName, error) => ({ collectionName, error }));
export function updateSchema(collectionName, idx, field) {
  return dispatch => {
    dispatch(updateSchemaRequest(collectionName));
    return fetch("PUT", `api/schema/${collectionName}/${idx}`, field)
      .then(res => res.json())
      .then(data => dispatch(updateSchemaSuccess(collectionName, data)))
      .catch(err => dispatch(updateSchemaFailure(collectionName, err)));
  };
}
