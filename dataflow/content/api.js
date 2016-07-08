import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/template";
const token = "7f96ded4-c6f7-4dde-8fee-0e08d2554fc7";

export const getContentList = (params) => {
  return fetch("GET", token, api)
    .then(res => res.json())
    .then(json => {
      const payload = { data : {}};

      for (const idx in json.data) {
        const item = json.data[idx];
        const id = item._id;

        payload.data[id] = item;
      }

      return payload;
    });
};

export const createTemplate = (params) => {
  return fetch("POST", token, api, params)
    .then(res => res.json());
};
