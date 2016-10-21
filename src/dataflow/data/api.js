import fetch from "../fetchWrapper";

const api = "api/data";

export const getSpec = params => {
  const { templateID } = params;
  return fetch("GET", `${api}/spec/${templateID}`)
    .then(res => res.json());
};

export const getData = params => {
  const { templateID, page = 1, limit = 15 } = params;
  return fetch("GET", `${api}/${templateID}/${page}/${limit}`)
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
