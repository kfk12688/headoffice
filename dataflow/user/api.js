import "isomorphic-fetch";
import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api";

export const getUserList = () =>
  fetch("GET", `${api}/user`)
    .then(res => res.json())
    .then(json => {
      const payload = { data : {} };

      for (const idx in json.data) {
        const item = json.data[idx];
        const id = item._id;
        delete item._id;

        payload.data[id] = { id, ...item };
      }

      return payload;
    });


export const addNewUser = (params) =>
  fetch("POST", `${api}/signUp`, params)
    .then(res => res.json())
    .then(json => json.data);

export const deleteUser = params =>
  fetch("DELETE", `${api}/user/${params.id}`)
    .then(res => res.json());
