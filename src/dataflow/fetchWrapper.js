import "isomorphic-fetch";

export default function (method, api, params) {
  const token = localStorage.getItem("id_token") || null;
  if (!token) throw Error("No token present. Login again");

  const headers = new Headers({
    authorization : `Bearer ${token}`,
  });

  let settings = {
    headers,
    method,
    cache : "default",
    mode  : "same-origin",
  };

  if ((method === "POST") || (method === "PUT")) {
    headers.append("Content-Type", "application/json");

    settings = {
      headers,
      body  : JSON.stringify(params),
      method,
      cache : "default",
    };
  }

  const req = new Request(api, settings);
  return fetch(req);
}
