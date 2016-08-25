import fetch from "../../fetchWrapper";

const api = "http://localhost:3001/api/template";

export const getTemplate = params =>
  fetch("GET", `${api}/${params.id}`)
    .then(res => res.json());

export const updateTemplate = params =>
  fetch("PUT", `${api}`, params)
    .then(res => res.json());
