// import {data as egdata} from "../mock_data/EGData";
import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/template";
const token = "7f96ded4-c6f7-4dde-8fee-0e08d2554fc7";

export const getTemplateForEdit = (params) => {
  return fetch("GET", token, `${api}/${params.id}`)
    .then(res => res.json());
};

export const modifyTemplate = (params) => {
  return fetch("PUT", token, `${api}`, params)
    .then(res => res.json());
};
