import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import { GET_SPEC_REQUEST, GET_SPEC_SUCCESS, GET_SPEC_FAILURE, GET_COLLECTIONS_REQUEST, GET_COLLECTIONS_SUCCESS, GET_COLLECTIONS_FAILURE, STAR_COLLECTION_SUCCESS, EDIT_COLLECTION_REQUEST, EDIT_COLLECTION_SUCCESS, EDIT_COLLECTION_FAILURE, DELETE_COLLECTION_REQUEST, DELETE_COLLECTION_SUCCESS, DELETE_COLLECTION_FAILURE, STAR_COLLECTION_REQUEST, STAR_COLLECTION_FAILURE, GET_COLLECTION_REQUEST, GET_COLLECTION_SUCCESS, GET_COLLECTION_FAILURE } from "./types";

const collectionsRequest = createAction(GET_COLLECTIONS_REQUEST);
const collectionsSuccess = createAction(GET_COLLECTIONS_SUCCESS, data => ({ data }));
const collectionsFailure = createAction(GET_COLLECTIONS_FAILURE, err => ({ err }));
export function getCollections() {
  return dispatch => {
    dispatch(collectionsRequest());

    return fetch("GET", "api/collections")
      .then(res => res.json())
      .then(data => dispatch(collectionsSuccess(data)))
      .catch(err => dispatch(collectionsFailure(err)));
  };
}

const collectionRequest = createAction(GET_COLLECTION_REQUEST, collectionName => ({ collectionName }));
const collectionSuccess = createAction(GET_COLLECTION_SUCCESS, (collectionName, data) => ({ collectionName, data }));
const collectionFailure = createAction(GET_COLLECTION_FAILURE, (collectionName, err) => ({ collectionName, err }));
export function getCollection(collectionName) {
  return dispatch => {
    dispatch(collectionRequest(collectionName));

    return fetch("GET", `api/collections/${collectionName}`)
      .then(res => res.json())
      .then(data => dispatch(collectionSuccess(collectionName, data)))
      .catch(err => dispatch(collectionFailure(collectionName, err)));
  };
}

const specRequest = createAction(GET_SPEC_REQUEST, (collectionName) => ({ collectionName }));
const specSuccess = createAction(GET_SPEC_SUCCESS, (collectionName, data) => ({ collectionName, data }));
const specFailure = createAction(GET_SPEC_FAILURE, (collectionName, err) => ({ collectionName, err }));
export function getSchema(collectionName) {
  return dispatch => {
    dispatch(specRequest(collectionName));

    return fetch("GET", `api/schema/${collectionName}`)
      .then(res => res.json())
      .then(data => dispatch(specSuccess(collectionName, data)))
      .catch(err => dispatch(specFailure(collectionName, err)));
  };
}

const updateCollectionRequest = createAction(EDIT_COLLECTION_REQUEST, (collectionName) => ({ collectionName }));
const updateCollectionSuccess = createAction(EDIT_COLLECTION_SUCCESS, (collectionName, json) => ({
  collectionName,
  data    : json.data,
  message : json.message,
}));
const updateCollectionFailure = createAction(EDIT_COLLECTION_FAILURE, (collectionName, err) => ({
  collectionName,
  err,
}));
export function updateCollection(collectionName, data) {
  return dispatch => {
    dispatch(updateCollectionRequest(collectionName));
    return fetch("PUT", `api/collections/${collectionName}`, data)
      .then(res => res.json())
      .then(json => dispatch(updateCollectionSuccess(collectionName, json)))
      .catch(err => dispatch(updateCollectionFailure(collectionName, err)));
  };
}

const deleteCollectionRequest = createAction(DELETE_COLLECTION_REQUEST);
const deleteCollectionSuccess = createAction(DELETE_COLLECTION_SUCCESS, (collectionName, json) => ({
  collectionName,
  data    : json.data,
  message : json.message,
}));
const deleteCollectionFailure = createAction(DELETE_COLLECTION_FAILURE, (collectionName, err) => ({
  collectionName,
  err,
}));
export function deleteCollection(collectionName) {
  return dispatch => {
    dispatch(deleteCollectionRequest(collectionName));

    return fetch("DELETE", `api/collections/${collectionName}`)
      .then(res => res.json())
      .then(json => dispatch(deleteCollectionSuccess(collectionName, json)))
      .catch(err => dispatch(deleteCollectionFailure(collectionName, err)));
  };
}

const starCollectionRequest = createAction(STAR_COLLECTION_REQUEST, (collectionName) => ({ collectionName }));
const starCollectionSuccess = createAction(STAR_COLLECTION_SUCCESS, (collectionName, data) => ({
  collectionName,
  data,
}));
const starCollectionFailure = createAction(STAR_COLLECTION_FAILURE, (collectionName, error) => ({
  collectionName,
  error,
}));
export function starCollection(collectionName) {
  return dispatch => {
    dispatch(starCollectionRequest());
    return fetch("GET", `api/collections/star/${collectionName}`)
      .then(res => res.json())
      .then(data => dispatch(starCollectionSuccess(collectionName, data)))
      .catch(error => dispatch(starCollectionFailure(collectionName, error)));
  };
}
