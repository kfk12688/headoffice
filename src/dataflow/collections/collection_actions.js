import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, UPDATE_ROW_REQUEST,
  UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, DELETE_ROW_FAILURE, DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS,
  GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_ROW_REQUEST, ADD_ROW_SUCCESS,
  ADD_ROW_FAILURE, STAR_COLLECTION_SUCCESS, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, EDIT_TEMPLATE_FAILURE,
  DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE
} from "./types";

/**
 * Get the list of templates
 */
const templatesRequest = createAction(GET_TEMPLATES_REQUEST);
const templatesSuccess = createAction(GET_TEMPLATES_SUCCESS, data => ({ data }));
const templatesFailure = createAction(GET_TEMPLATES_FAILURE, err => ({ err }));

export function getTemplates() {
  return dispatch => {
    dispatch(templatesRequest());

    return fetch("GET", "api/templates")
      .then(res => res.json())
      .then(templates => dispatch(templatesSuccess(templates)))
      .catch(err => dispatch(templatesFailure(err)));
  };
}

/**
 * Get the available data for the requested template
 */
const dataRequest = createAction(DATA_REQUEST, (collectionName) => ({ collectionName }));
const dataSuccess = createAction(DATA_SUCCESS, (collectionName, data) => ({ collectionName, data }));
const dataFailure = createAction(DATA_FAILURE, (collectionName, err) => ({ collectionName, err }));

export function loadData(collectionName, query) {
  return dispatch => {
    dispatch(dataRequest(collectionName));

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
const specRequest = createAction(SPEC_REQUEST, (collectionName) => ({ collectionName }));
const specSuccess = createAction(SPEC_SUCCESS, (collectionName, json) => ({
  collectionName,
  template : json,
}));
const specFailure = createAction(SPEC_FAILURE, (collectionName, err) => ({ collectionName, err }));

export function loadSpec(collectionName) {
  return dispatch => {
    dispatch(specRequest(collectionName));

    return fetch("GET", `api/templates/${collectionName}`)
      .then(res => res.json())
      .then(json => dispatch(specSuccess(collectionName, json)))
      .catch(err => dispatch(specFailure(collectionName, err)));
  };
}

/**
 * Update an existing row in the collection
 */
const updateRowRequest = createAction(UPDATE_ROW_REQUEST, (collectionName) => ({ collectionName }));
const updateRowSuccess = createAction(UPDATE_ROW_SUCCESS, data => ({ data }));
const updateRowFailure = createAction(UPDATE_ROW_FAILURE, err => err);

export function updateRow(collectionName, id, data) {
  return dispatch => {
    dispatch(updateRowRequest(collectionName));

    return fetch("PUT", `api/collections/${collectionName}/${id}`, { data })
      .then(res => res.json())
      .then(row => dispatch(updateRowSuccess(row)))
      .catch(err => dispatch(updateRowFailure(err)));
  };
}

/**
 * Delete an existing row from the collection
 */
const deleteRowRequest = createAction(DELETE_ROW_REQUEST, (collectionName) => ({ collectionName }));
const deleteRowSuccess = createAction(DELETE_ROW_SUCCESS, data => data);
const deleteRowFailure = createAction(DELETE_ROW_FAILURE, err => err);

export function deleteRow(collectionName, id) {
  return dispatch => {
    dispatch(deleteRowRequest(collectionName));

    return fetch("DELETE", `api/collections/${collectionName}/${id}`)
      .then(res => res.json())
      .then(row => dispatch(deleteRowSuccess(row)))
      .catch(err => dispatch(deleteRowFailure(err)));
  };
}

/**
 * Add a new row
 */
const addRowRequest = createAction(ADD_ROW_REQUEST, (collectionName) => ({ collectionName }));
const addRowSuccess = createAction(ADD_ROW_SUCCESS, (collectionName, row) => ({ collectionName, row }));
const addRowFailure = createAction(ADD_ROW_FAILURE, err => err);

export function addRow(collectionName, data) {
  return dispatch => {
    dispatch(addRowRequest(collectionName));

    return fetch("POST", `api/collections/${collectionName}`, data)
      .then(res => res.json())
      .then(row => dispatch(addRowSuccess(collectionName, row)))
      .catch(err => dispatch(addRowFailure(collectionName, err)));
  };
}

/**
 * Favorite/Unfavorite a template
 */
const starCollectionSuccess = createAction(STAR_COLLECTION_SUCCESS, (collectionName, template) => ({
  collectionName,
  template,
}));
export function starCollection(collectionName) {
  return dispatch => fetch("GET", `api/collections/star/${collectionName}`)
    .then(res => res.json())
    .then(template => dispatch(starCollectionSuccess(collectionName, template)));
}

/**
 * Update a template
 */
const updateTemplateRequest = createAction(EDIT_TEMPLATE_REQUEST, (collectionName) => ({ collectionName }));
const updateTemplateSuccess = createAction(EDIT_TEMPLATE_SUCCESS, (collectionName, json) => ({
  collectionName,
  template : json.data,
  message  : json.message,
}));
const updateTemplateFailure = createAction(EDIT_TEMPLATE_FAILURE, (collectionName, err) => ({
  collectionName,
  err,
}));
export function updateTemplate(collectionName, data) {
  return dispatch => {
    dispatch(updateTemplateRequest(collectionName));
    return fetch("PUT", `api/collections/${collectionName}`, data)
      .then(res => res.json())
      .then(json => dispatch(updateTemplateSuccess(collectionName, json)))
      .catch(err => dispatch(updateTemplateFailure(collectionName, err)));
  };
}

/**
 * Delete an existing table template from db
 */
const deleteTemplateRequest = createAction(DELETE_TEMPLATE_REQUEST);
const deleteTemplateSuccess = createAction(DELETE_TEMPLATE_SUCCESS, (collectionName, json) => ({
  collectionName,
  template : json.data,
  message  : json.message,
}));
const deleteTemplateFailure = createAction(DELETE_TEMPLATE_FAILURE, (collectionName, err) => ({
  collectionName,
  err,
}));
export function deleteTemplate(collectionName) {
  return dispatch => {
    dispatch(deleteTemplateRequest(collectionName));

    return fetch("DELETE", `api/collections/${collectionName}`)
      .then(res => res.json())
      .then(json => dispatch(deleteTemplateSuccess(collectionName, json)))
      .catch(err => dispatch(deleteTemplateFailure(collectionName, err)));
  };
}
