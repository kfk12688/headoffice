import "isomorphic-fetch";
import * as dg from "../data/datagrid";

// const API_ROOT = "https://localhost:3001/";

// const fetchHeaders = new Headers({
//   "Content-Type" : "application/json",
// });


function callApi(endpoint) {
  // const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  //
  // fetch(fullUrl, {
  //   headers : fetchHeaders,
  // })
  //   .then()
  //   .done();

  // mock data for fetch
  if ((endpoint === "template") || (endpoint === "list")) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dg.data);
      }, 3300);
    });
  }
}

export const CALL_API = Symbol("TEMPLATE API");

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type : requestType }));

  return callApi(endpoint)
    .then(
      response => next(actionWith({
        response,
        type : successType,
      })),
      error => next(actionWith({
        type  : failureType,
        error : error.message || "Something bad happened",
      }))
    );
};
