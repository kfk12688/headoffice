import _ from "underscore";
import fetch, { cachedFetch } from "./fetchWrapper";

/**
 * Data API's
 */
export const getSpec = params => {
  const { templateID } = params;
  return fetch("GET", `api/data/spec/${templateID}`)
    .then(res => res.json());
};

export const getData = params => {
  const { templateID, page, limit } = params;
  return fetch("GET", `api/data/${templateID}/${page}/${limit}`)
    .then(res => res.json());
};

export const updateRow = params => {
  const { rowID, templateID, fields } = params;
  return fetch("PUT", "api/data", {
    id : rowID,         // fixme :  for clarity, id needs to be changed to rowID
    templateID,
    fields,
  })
    .then(res => res.json());
};

export const addRow = params => {
  const { templateID, data } = params;
  return fetch("POST", "api/data", {
    templateID,
    data,
  })
    .then(res => res.json());
};

export const deleteRow = params => {
  const { templateID, rowID } = params;

  return fetch("DELETE", "api/data", {
    templateID,
    id : rowID,
  })
    .then(res => res.json());
};

/**
 * Listing API's
 */
export const listTemplates = (query) => {
  const fetchPromise = (q) => cachedFetch("GET", `api/list/templates?q=${q}`)
    .then(res => res.json())
    .then(json => json.data);

  return Promise.resolve(fetchPromise(query));
};

export const listTemplateFields = (id) => {
  const fetchPromise = (q) => cachedFetch("GET", `api/list/templateFields/${id}?q=${q}`)
    .then(res => res.json())
    .then(json => json.data);

  return (query) => new Promise(resolve => {
    resolve(fetchPromise(query));
  });
};

export const listFieldValues = (options) => {
  const { ref, refField } = options;
  const fetchPromise = (q) => cachedFetch("GET", `api/list/${ref}/${refField}?q=${q}`)
    .then(res => res.json())
    .then(json => json.data);

  return (query) => new Promise(resolve => {
    resolve(fetchPromise(query));
  });
};

/**
 * Template Api's
 */
export const getTemplates = () =>
  fetch("GET", "api/template")
    .then(res => res.json());

export const createTemplate = (params) =>
  fetch("POST", "api/template", params)
    .then(res => res.json());

export const deleteTemplate = (params) =>
  fetch("DELETE", `api/template/${params.id}`)
    .then(res => res.json());

export const getTemplate = params =>
  fetch("GET", `api/template/${params.id}`)
    .then(res => res.json());

export const updateTemplate = params =>
  fetch("PUT", "api/template", params)
    .then(res => res.json());

export const updateTemplateSchema = params =>
  fetch("PUT", "api/template/schema", params)
    .then(res => res.json());

/**
 * User API's
 */
export const getUserList = () =>
  fetch("GET", "api/user")
    .then(res => res.json());

export const addNewUser = (params) =>
  fetch("POST", "api/signUp", params)
    .then(res => res.json())
    .then(json => json.data);

export const deleteUser = params =>
  fetch("DELETE", `api/user/${params.id}`)
    .then(res => res.json());

export const logOut = () =>
  fetch("GET", "auth/logout");

/**
 * Workbook API's
 */
export const searchWorkbook = (query) =>
  fetch("GET", `api/workbook?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, item => ({ label : item.name, id : item.id })),
    }));

export const getWorkbooksList = () =>
  fetch("GET", "api/workbook")
    .then(res => res.json());

export const addNewWorkbook = (params) =>
  fetch("POST", "api/workbook", params)
    .then(res => res.json())
    .then(json => json.data);

export const deleteWorkbook = params =>
  fetch("DELETE", `api/workbook/${params.id}`)
    .then(res => res.json());
