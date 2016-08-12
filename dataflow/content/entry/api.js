import fetch from "../../fetchWrapper";

const api = "http://localhost:3001/api/entry";

export const getSpec = params => {
  const { templateId } = params;
  return fetch("GET", `${api}/spec/${templateId}`)
    .then(res => res.json());
};

export const getData = params => {
  const { templateId } = params;
  return fetch("GET", `${api}/data/${templateId}`)
    .then(res => res.json());
};

export const updateRow = params => {
  const { rowId, templateId, fields } = params;
  return fetch("PUT", `${api}/data`, {
    id : rowId,         // fixme :  for clarity, id needs to be changed to rowId
    templateId,
    fields,
  })
    .then(res => res.json());
};

export const addRow = params => {
  const { templateId, fields } = params;
  return fetch("POST", `${api}/data`, {
    templateId,
    fields,
  })
    .then(res => res.json());
};

export const deleteRow = params => {
  const { templateId, rowId } = params;

  return fetch("DELETE", `${api}/data`, {
    templateId,
    rowId,
  })
    .then(res => res.json());
};
