import fetch from "../fetchWrapper";

const api = "api/template";

export const getTemplates = () =>
  fetch("GET", api)
    .then(res => res.json());

export const createTemplate = (params) =>
  fetch("POST", api, params)
    .then(res => res.json());

export const deleteTemplate = (params) =>
  fetch("DELETE", `${api}/${params.id}`)
    .then(res => res.json());

export const getTemplate = params =>
  fetch("GET", `${api}/${params.id}`)
    .then(res => res.json());

export const updateTemplate = params =>
  fetch("PUT", `${api}`, params)
    .then(res => res.json());

export const updateTemplateSchema = params =>
  fetch("PUT", `${api}/schema`, params)
    .then(res => res.json());
