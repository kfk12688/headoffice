import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/template";

export const getContentList = () => {
  return fetch("GET", api)
    .then(res => res.json())
    .then(json => {
      const payload = { data : {} };

      for (const idx in json.data) {
        const item = json.data[idx];
        const id = item.id;

        payload.data[id] = item;
      }

      return payload;
    });
};

export const createTemplate = (params) => {
  return fetch("POST", api, params)
    .then(res => res.json());
};

export const deleteTemplate = (params) => {
  return fetch("DELETE", `${api}/${params.id}`)
    .then(res => res.json());
};
