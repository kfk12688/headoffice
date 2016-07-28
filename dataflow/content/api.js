import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/template";
const token = "93abcf28-65e9-45b1-912a-8bec6eb10a3d";

export const getContentList = () => {
  return fetch("GET", token, api)
    .then(res => res.json())
    .then(json => {
      const payload = { data : {}};

      for (const idx in json.data) {
        const item = json.data[idx];
        const id = item.id;

        payload.data[id] = item;
      }

      return payload;
    });
};

export const createTemplate = (params) => {
  return fetch("POST", token, api, params)
    .then(res => res.json());
};

export const deleteTemplate = (params) => {
  return fetch("DELETE", token, `${api}/${params.id}`)
    .then(res => res.json());
};
