import "isomorphic-fetch";
import fetch from "../fetchWrapper";

const api = "api";

export const getUserList = () =>
  fetch("GET", `${api}/user`)
    .then(res => res.json());

export const addNewUser = (params) =>
  fetch("POST", `${api}/signUp`, params)
    .then(res => res.json())
    .then(json => json.data);

export const deleteUser = params =>
  fetch("DELETE", `${api}/user/${params.id}`)
    .then(res => res.json());

export const logOut = () =>
  fetch("GET", "auth/logout");
