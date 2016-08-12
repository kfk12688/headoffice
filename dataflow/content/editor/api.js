// import {data as egdata} from "../mock_data/EGData";
import fetch from "../../fetchWrapper";

const api = "http://localhost:3001/api/template";

export const getTemplate = params => {
  return fetch("GET", `${api}/${params.id}`)
    .then(res => res.json());
};

export const updateTemplate = params => {
  return fetch("PUT", `${api}`, params)
    .then(res => res.json());
};
