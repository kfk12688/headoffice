import "isomorphic-fetch";

export default function (method, api, params) {
  const headers = new Headers({
    authorization : "Bearer 4ab65fb0-5bec-4d84-9b7d-dd218283c137",
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
