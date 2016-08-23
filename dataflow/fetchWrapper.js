import "isomorphic-fetch";

export default function (method, api, params) {
  const headers = new Headers({
    authorization : "Bearer 76e39a96-a8cf-4ae5-830a-84122a28dc45",
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
