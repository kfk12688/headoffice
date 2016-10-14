import fetch from "../fetchWrapper";
import _ from "underscore";

const api = "api/list";

export const listTemplates = (query) => fetch("GET", `${api}/templates?query=${query}`)
  .then(res => res.json())
  .then(json => ({
    options : _.map(json.data, item => ({ label : item.templateName, id : item._id })),
  }));

export const listTemplateFields = (id) => {
  const fetchPromise = (query) => fetch("GET", `${api}/templateFields/${id}?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, (item, idx) => ({ label : item, id : idx })),
    }));

  if (!id) return () => {};
  return fetchPromise;
};

export const listFieldValues = (query) => {
  const { refId, refFieldName } = query;

  const fetchPromise = () => fetch("GET", `${api}/${refId}/${refFieldName}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, item => ({ label : item[refFieldName], id : item._id })),
    }));

  return fetchPromise;
};
