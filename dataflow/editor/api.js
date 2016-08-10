// import {data as egdata} from "../mock_data/EGData";
import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/template";
const token = "93abcf28-65e9-45b1-912a-8bec6eb10a3d";

export const getTemplate = params => {
  return fetch("GET", token, `${api}/${params.id}`)
    .then(res => res.json());
};

export const updateTemplate = params => {
  return fetch("PUT", token, `${api}`, params)
    .then(res => res.json());
};
