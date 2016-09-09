import { createAction } from "redux-actions";
import { ADD_FIELD } from "./types";
import { getTemplate, updateTemplate, updateTemplateSchema } from "./apiActions";

export const loadEditor = params => (dispatch) =>
  dispatch(getTemplate(params));

export const editTemplate = params => (dispatch) =>
  dispatch(updateTemplate(params))
    .then(dispatch(loadEditor(params)));

export const editTemplateSchema = params => (dispatch) =>
  dispatch(updateTemplateSchema(params))
    .then(dispatch(loadEditor(params)));

export const addField = createAction(ADD_FIELD, field => ({ field }));
