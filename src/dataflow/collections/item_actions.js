import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE, UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE, ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE, GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_FAILURE } from "./types";

/**
 * Get the available data for the requested template
 */
const getItemsRequest = createAction(GET_ITEMS_REQUEST, (collectionName) => ({ collectionName }));
const getItemsSuccess = createAction(GET_ITEMS_SUCCESS, (collectionName, data) => ({ collectionName, data }));
const getItemsFailure = createAction(GET_ITEMS_FAILURE, (collectionName, err) => ({ collectionName, err }));
export function getItems(collectionName, query) {
  return dispatch => {
    dispatch(getItemsRequest(collectionName));

    const { page, limit } = query;
    return fetch("GET", `api/items/${collectionName}?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(json => dispatch(getItemsSuccess(collectionName, json)))
      .catch(err => dispatch(getItemsFailure(collectionName, err)));
  };
}

/**
 * Get data request
 */
const getItemRequest = createAction(GET_ITEM_REQUEST, (collectionName) => ({ collectionName }));
const getItemSuccess = createAction(GET_ITEM_SUCCESS, (collectionName, data) => ({ collectionName, data }));
const getItemFailure = createAction(GET_ITEM_FAILURE, err => err);
export function getItem(collectionName, id) {
  return dispatch => {
    dispatch(getItemRequest(collectionName));

    return fetch("GET", `api/items/${collectionName}/${id}`)
      .then(res => res.json())
      .then(data => dispatch(getItemSuccess(collectionName, data)))
      .catch(err => dispatch(getItemFailure(collectionName, err)));
  };
}

/**
 * Update an existing row in the collection
 */
const updateItemRequest = createAction(UPDATE_ITEM_REQUEST, (collectionName) => ({ collectionName }));
const updateItemSuccess = createAction(UPDATE_ITEM_SUCCESS, (collectionName, id, json) => ({
  collectionName, id,
  data    : json.data,
  message : json.message,
}));
const updateItemFailure = createAction(UPDATE_ITEM_FAILURE, err => err);
export function updateItem(collectionName, id, data) {
  return dispatch => {
    dispatch(updateItemRequest(collectionName));

    return fetch("PUT", `api/items/${collectionName}/${id}`, data)
      .then(res => res.json())
      .then(json => dispatch(updateItemSuccess(collectionName, id, json)))
      .catch(err => dispatch(updateItemFailure(err)));
  };
}

/**
 * Delete an existing row from the collection
 */
const deleteItemRequest = createAction(DELETE_ITEM_REQUEST, (collectionName) => ({ collectionName }));
const deleteItemSuccess = createAction(DELETE_ITEM_SUCCESS, (collectionName, id, json) => ({
  collectionName, id,
  data    : json.data,
  message : json.message,
}));
const deleteItemFailure = createAction(DELETE_ITEM_FAILURE, err => err);
export function deleteItem(collectionName, id) {
  return dispatch => {
    dispatch(deleteItemRequest(collectionName));

    return fetch("DELETE", `api/items/${collectionName}/${id}`)
      .then(res => res.json())
      .then(json => dispatch(deleteItemSuccess(collectionName, id, json)))
      .catch(err => dispatch(deleteItemFailure(err)));
  };
}

/**
 * Add a new row
 */
const addItemRequest = createAction(ADD_ITEM_REQUEST, (collectionName) => ({ collectionName }));
const addItemSuccess = createAction(ADD_ITEM_SUCCESS, (collectionName, json) => ({
  collectionName,
  data    : json.data,
  message : json.message,
}));
const addItemFailure = createAction(ADD_ITEM_FAILURE, err => err);
export function addItem(collectionName, data) {
  return dispatch => {
    dispatch(addItemRequest(collectionName));

    return fetch("POST", `api/items/${collectionName}`, data)
      .then(res => res.json())
      .then(data => dispatch(addItemSuccess(collectionName, data)))
      .catch(err => dispatch(addItemFailure(collectionName, err)));
  };
}
