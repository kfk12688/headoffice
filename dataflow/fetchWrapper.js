import "isomorphic-fetch";

export default function (method, api, params) {
  const headers = new Headers({
    authorization : `Bearer 42a39527-fba5-4cc5-9f9d-ce23eb6c08d9`,
  });

  let settings = {
    headers,
    method,
    cache : "default",
    mode: "same-origin",
  };

  if ((method === "POST") || (method === "PUT")) {
    headers.append("Content-Type", "application/json");

    settings = {
      headers,
      body : JSON.stringify(params),
      method,
      cache : "default",
    };
  }

  const req = new Request(api, settings);

  return fetch(req);
}
