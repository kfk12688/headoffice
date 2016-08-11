import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api";

export const searchWorkbook = (query) =>
  fetch("GET", `${api}/workbook?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : json.data.map(item => ({ label : item.name, id : item._id })),
    }));


export const getWorkbooksList = () =>
  fetch("GET", `${api}/workbook`)
    .then(res => res.json())
    .then(json => {
      const payload = { data : {} };

      for (const idx in json.data) {
        const item = json.data[idx];
        const id = item._id;
        delete item._id;

        payload.data[id] = { id, ...item };
      }

      return payload;
    });


export const addNewWorkbook = (params) =>
  fetch("POST", `${api}/workbook`, params)
    .then(res => res.json())
    .then(json => json.data);

export const deleteWorkbook = params =>
  fetch("DELETE", `${api}/workbook/${params.id}`)
    .then(res => res.json());
