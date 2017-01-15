import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import {
  EDIT_TEMPLATE_FAILURE, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, EDIT_SCHEMA_FAILURE, EDIT_SCHEMA_REQUEST,
  EDIT_SCHEMA_SUCCESS, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST,
  ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, GET_TEMPLATE_REQUEST,
  GET_TEMPLATE_SUCCESS, GET_TEMPLATE_FAILURE, DELETE_TEMPLATE_FAILURE, ADD_USER_SCHEMA_FIELD, STAR_TEMPLATE_SUCCESS
} from "./types";

// ####################################################
// Templates Route Actions
// ####################################################
/**
 * Get all templates
 */
const templatesRequest = createAction(GET_TEMPLATES_REQUEST);
const templatesSuccess = createAction(GET_TEMPLATES_SUCCESS, (templates) => ({ templates }));
const templatesFailure = createAction(GET_TEMPLATES_FAILURE, (error) => ({ error }));
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
 * Create a new table template
 */
const createTemplateRequest = createAction(ADD_TEMPLATE_REQUEST);
const createTemplateSuccess = createAction(ADD_TEMPLATE_SUCCESS, (json) => ({
  template : json.data,
  message  : json.message,
}));
const createTemplateFailure = createAction(ADD_TEMPLATE_FAILURE, (error) => ({ error }));
export function createTemplate(data) {
  return dispatch => {
    dispatch(createTemplateRequest());

    return fetch("POST", "api/templates", data)
      .then(res => res.json())
      .then(template => dispatch(createTemplateSuccess(template)))
      .catch(err => dispatch(createTemplateFailure(err)));
  };
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
const updateTemplateFailure = createAction(EDIT_TEMPLATE_FAILURE, (collectionName, error) => ({
  collectionName,
  error : JSON.parse(JSON.stringify(error)),
}));
export function updateTemplate(collectionName, data) {
  return dispatch => {
    dispatch(updateTemplateRequest(collectionName));
    return fetch("PUT", `api/templates/${collectionName}`, data)
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
const deleteTemplateFailure = createAction(DELETE_TEMPLATE_FAILURE, (collectionName, error) => ({
  collectionName,
  error,
}));
export function deleteTemplate(collectionName) {
  return dispatch => {
    dispatch(deleteTemplateRequest(collectionName));

    return fetch("DELETE", `api/templates/${collectionName}`)
      .then(res => res.json())
      .then(json => dispatch(deleteTemplateSuccess(collectionName, json)))
      .catch(err => dispatch(deleteTemplateFailure(collectionName, err)));
  };
}

/**
 * Favorite/Unfavorite a template
 */
const starTemplateSuccess = createAction(STAR_TEMPLATE_SUCCESS, (collectionName, template) => ({
  collectionName,
  template,
}));
export function starTemplate(collectionName) {
  return dispatch => {
    return fetch("GET", `api/templates/star/${collectionName}`)
      .then(res => res.json())
      .then(template => dispatch(starTemplateSuccess(collectionName, template)));
  };
}

// ####################################################
// Template Editor Route Actions
// ####################################################
/**
 * Get a template
 */
const templateRequest = createAction(GET_TEMPLATE_REQUEST, (collectionName) => ({ collectionName }));
const templateSuccess = createAction(GET_TEMPLATE_SUCCESS, (collectionName, template) => ({
  collectionName,
  template,
}));
const templateFailure = createAction(GET_TEMPLATE_FAILURE, (collectionName, error) => ({ collectionName, error }));
export function getTemplate(collectionName) {
  return dispatch => {
    dispatch(templateRequest(collectionName));

    return fetch("GET", `api/templates/${collectionName}`)
      .then(res => res.json())
      .then(template => dispatch(templateSuccess(collectionName, template)))
      .catch(err => dispatch(templateFailure(collectionName, err)));
  };
}

/**
 * Update a template's schema
 */
const updateSchemaRequest = createAction(EDIT_SCHEMA_REQUEST, collectionName => ({ collectionName }));
const updateSchemaSuccess = createAction(EDIT_SCHEMA_SUCCESS, (collectionName, template) => ({
  collectionName,
  template,
}));
const updateSchemaFailure = createAction(EDIT_SCHEMA_FAILURE, (collectionName, error) => ({ collectionName, error }));
export function updateSchema(collectionName, schema) {
  return dispatch => {
    dispatch(updateSchemaRequest(collectionName));
    return fetch("PUT", `api/templates/${collectionName}/schema`, schema)
      .then(res => res.json())
      .then(template => dispatch(updateSchemaSuccess(collectionName, template)))
      .catch(err => dispatch(updateSchemaFailure(collectionName, err)));
  };
}

/**
 * Add a schema field to the redux store
 */
export const addField = createAction(ADD_USER_SCHEMA_FIELD, (collectionName, field) => ({ collectionName, field }));
