/**
 * Created by sharavan on 05/09/16.
 */
import fetch from "../fetchWrapper";
import _ from "underscore";

const api = "http://localhost:3001/api";

export const listTemplates = (query) => fetch("GET", `${api}/list/templates?query=${query}`)
  .then(res => res.json())
  .then(json => ({
    options : _.map(json.data, item => ({ label : item.templateName, id : item._id })),
  }));

export const listTemplateFields = (id) => {
  const fetchPromise = (query) => fetch("GET", `${api}/list/templateFields/${id}?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, (item, idx) => ({ label : item, id : idx })),
    }));

  if (!id) return () => {};
  return fetchPromise;
};

export const listFieldValues = (query) => {
  const { refId, refFieldName } = query;

  const fetchPromise = () => fetch("GET", `${api}/list/${refId}/${refFieldName}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, item => ({ label : item[refFieldName], id : item._id })),
    }));

  return fetchPromise;
};
