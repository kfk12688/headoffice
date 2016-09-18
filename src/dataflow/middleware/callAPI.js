export const CALL_API = Symbol("CALL API");

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  const { callback, types } = callAPI;

  if (typeof callback !== "object") {
    throw new Error("Specify a callback promise.");
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

  return callback
    .then(
      response => next(actionWith({
        payload : response,
        type    : successType,
      })),
      error => next(actionWith({
        type    : failureType,
        payload : error.data || "Something bad happened",
        error   : true,
      }))
    );
};
