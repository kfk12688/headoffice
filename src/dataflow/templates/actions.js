import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import {
  EDIT_TEMPLATE_FAILURE, EDIT_TEMPLATE_REQUEST, EDIT_TEMPLATE_SUCCESS, EDIT_SCHEMA_FAILURE, EDIT_SCHEMA_REQUEST,
  EDIT_SCHEMA_SUCCESS, GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST,
  ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, GET_TEMPLATE_REQUEST,
  GET_TEMPLATE_SUCCESS, GET_TEMPLATE_FAILURE, DELETE_TEMPLATE_FAILURE, ADD_USER_SCHEMA_FIELD
} from "./types";
import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";

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
    dispatch(clearFilterState());
    dispatch(clearMenuState());
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
const createTemplateSuccess = createAction(ADD_TEMPLATE_SUCCESS, (template) => ({ template }));
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
const updateTemplateRequest = createAction(EDIT_TEMPLATE_REQUEST);
const updateTemplateSuccess = createAction(EDIT_TEMPLATE_SUCCESS, (template) => ({ template }));
const updateTemplateFailure = createAction(EDIT_TEMPLATE_FAILURE, (error) => ({ error }));
export function updateTemplate(collectionName, data) {
  return dispatch => {
    dispatch(updateTemplateRequest());
    return fetch("PUT", `api/templates/${collectionName}`, data)
      .then(res => res.json())
      .then(template => dispatch(updateTemplateSuccess(template)))
      .catch(err => dispatch(updateTemplateFailure(err)));
  };
}

/**
 * Delete an existing table template from db
 */
const deleteTemplateRequest = createAction(DELETE_TEMPLATE_REQUEST);
const deleteTemplateSuccess = createAction(DELETE_TEMPLATE_SUCCESS, (template) => ({ template }));
const deleteTemplateFailure = createAction(DELETE_TEMPLATE_FAILURE, (error) => ({ error }));
export function deleteTemplate(collectionName) {
  return dispatch => {
    dispatch(deleteTemplateRequest(collectionName));

    return fetch("DELETE", `api/templates/${collectionName}`)
      .then(res => res.json())
      .then(template => dispatch(deleteTemplateSuccess(template)))
      .catch(err => dispatch(deleteTemplateFailure(err)));
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
