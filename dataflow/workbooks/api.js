import fetch from "../fetchWrapper";
import _ from "underscore";

const api = "http://localhost:3001/api";

export const searchWorkbook = (query) =>
  fetch("GET", `${api}/workbook?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, item => ({ label : item.name, id : item._id })),
    }));

export const getWorkbooksList = () =>
  fetch("GET", `${api}/workbook`)
    .then(res => res.json());


export const addNewWorkbook = (params) =>
  fetch("POST", `${api}/workbook`, params)
    .then(res => res.json())
    .then(json => json.data);

export const deleteWorkbook = params =>
  fetch("DELETE", `${api}/workbook/${params.id}`)
    .then(res => res.json());
