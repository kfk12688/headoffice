import fetch from "../../fetchWrapper";

const api = "http://localhost:3001/api/data";

export const getSpec = params => {
  const { templateId } = params;
  return fetch("GET", `${api}/spec/${templateId}`)
    .then(res => res.json());
};

export const getData = params => {
  const { templateId } = params;
  return fetch("GET", `${api}/${templateId}`)
    .then(res => res.json());
};

export const updateRow = params => {
  const { rowId, templateId, fields } = params;
  return fetch("PUT", api, {
    id : rowId,         // fixme :  for clarity, id needs to be changed to rowId
    templateId,
    fields,
  })
    .then(res => res.json());
};

export const addRow = params => {
  const { templateId, data } = params;
  return fetch("POST", api, {
    templateId,
    data,
  })
    .then(res => res.json());
};

export const deleteRow = params => {
  const { templateId, rowId } = params;

  return fetch("DELETE", api, {
    templateId,
    id : rowId,
  })
    .then(res => res.json());
};
