import fetch from "../fetchWrapper";

const api = "api/data";

export const getSpec = params => {
  const { templateID } = params;
  return fetch("GET", `${api}/spec/${templateID}`)
    .then(res => res.json());
};

export const getData = params => {
  const { templateID, page, limit } = params;
  return fetch("GET", `${api}/${templateID}/${page}/${limit}`)
    .then(res => res.json());
};

export const updateRow = params => {
  const { rowID, templateID, fields } = params;
  return fetch("PUT", api, {
    id : rowID,         // fixme :  for clarity, id needs to be changed to rowID
    templateID,
    fields,
  })
    .then(res => res.json());
};

export const addRow = params => {
  const { templateID, data } = params;
  return fetch("POST", api, {
    templateID,
    data,
  })
    .then(res => res.json());
};

export const deleteRow = params => {
  const { templateID, rowID } = params;

  return fetch("DELETE", api, {
    templateID,
    id : rowID,
  })
    .then(res => res.json());
};
