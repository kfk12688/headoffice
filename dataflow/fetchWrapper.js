import "isomorphic-fetch";

export default function (method, api, params) {
  const headers = new Headers({
    authorization : "Bearer 0152d2e1-055a-4fd6-a846-ad1a8a07058c",
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
