import fetch from "../fetchWrapper";
import _ from "underscore";

const api = "api/workbook";

export const searchWorkbook = (query) =>
  fetch("GET", `${api}?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, item => ({ label : item.name, id : item.id })),
    }));

export const getWorkbooksList = () =>
  fetch("GET", api)
    .then(res => res.json());


export const addNewWorkbook = (params) =>
  fetch("POST", api, params)
    .then(res => res.json())
    .then(json => json.data);

export const deleteWorkbook = params =>
  fetch("DELETE", `${api}/${params.id}`)
    .then(res => res.json());
