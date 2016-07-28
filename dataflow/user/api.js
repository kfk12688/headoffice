import "isomorphic-fetch";
import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/user";
const token = "93abcf28-65e9-45b1-912a-8bec6eb10a3d";

export const getUserList = () =>
  fetch("GET", token, api)
    .then(res => res.json())
    .then(json => {
      const payload = { data : {} };

      for (const idx in json.data) {
        const item = json.data[idx];
        const id = item._id;

        payload.data[id] = item;
      }

      return payload;
    });
