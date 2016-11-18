import { cachedFetch } from "./fetchWrapper";
/**
 * Listing API's
 */
export const listTemplates = (query) => {
  const fetchPromise = (q) => cachedFetch("GET", `api/list/templates?q=${q}`)
    .then(res => res.json())
    .then(json => json.data);

  return Promise.resolve(fetchPromise(query));
};

export const listTemplateFields = (id) => {
  const fetchPromise = (q) => cachedFetch("GET", `api/list/templateFields/${id}?q=${q}`)
    .then(res => res.json())
    .then(json => json.data);

  return (query) => new Promise(resolve => {
    resolve(fetchPromise(query));
  });
};

export const listFieldValues = (ref, refField) => {
  return cachedFetch("GET", `api/list/${ref}/${refField}`)
    .then(res => res.json())
    .then(json => json.data);
};

