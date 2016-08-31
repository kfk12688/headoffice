import fetch from "../../fetchWrapper";

const api = "http://localhost:3001/api/template";

export const getTemplates = () =>
  fetch("GET", api)
    .then(res => res.json());

export const createTemplate = (params) =>
  fetch("POST", api, params)
    .then(res => res.json());

export const deleteTemplate = (params) =>
  fetch("DELETE", `${api}/${params.id}`)
    .then(res => res.json());
