/**
 * Created by sharavan on 15/09/16.
 */
// The middleware to call the API for quotes
import "isomorphic-fetch";
import { createAction } from "redux-actions";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./types";
const api = "http://localhost:3001/api";

const requestLogin = createAction(LOGIN_REQUEST, creds => ({
  type            : LOGIN_REQUEST,
  isFetching      : true,
  isAuthenticated : false,
  creds,
}));
const receiveLogin = createAction(LOGIN_SUCCESS, user => ({
  type            : LOGIN_SUCCESS,
  isFetching      : false,
  isAuthenticated : true,
  id_token        : user.id_token,
}));
const loginError = createAction(LOGIN_FAILURE, message => ({
  type            : LOGIN_FAILURE,
  isFetching      : false,
  isAuthenticated : false,
  message,
}));
const requestLogout = createAction(LOGOUT_REQUEST, () => ({
  type            : LOGOUT_REQUEST,
  isFetching      : true,
  isAuthenticated : true,
}));
const receiveLogout = createAction(LOGOUT_REQUEST, () => ({
  type            : LOGOUT_SUCCESS,
  isFetching      : false,
  isAuthenticated : false,
}));

export const loginUser = (creds) => dispatch => {
  dispatch(requestLogin(creds));

  fetch(`${api}/signIn`, {
    method  : "POST",
    headers : { "Content-Type" : "application/json" },
    body    : JSON.stringify(creds),
    mode    : "same-origin",
    cache   : "default",
  })
    .then(response => response.json())
    .then(json => {
      const { status } = json;

      if (status !== "success") {
        // If there was a problem, we want to
        // dispatch the error condition
        dispatch(loginError(json.error));
      } else {
        // If login was successful, set the token in local storage
        localStorage.setItem("id_token", json.data.token);

        // Dispatch the success action
        dispatch(receiveLogin(json.data));
      }
    })
    .catch(err => console.log("Error: ", err));
};
export const logoutUser = () => dispatch => {
  dispatch(requestLogout());

  fetch(`${api}/signOut`, {
    method  : "POST",
    headers : {
      "Content-Type" : "application/json",
      authorization  : `Bearer ${localStorage.getItem("id_token")}`,
    },
    mode    : "same-origin",
    cache   : "default",
  })
    .then(response => response.json())
    .then(json => {
      const { status } = json;
      if (status === "success") {
        localStorage.removeItem("id_token");
        dispatch(receiveLogout());
      }
    })
    .catch(err => console.log("Error: ", err));
};
