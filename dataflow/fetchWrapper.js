import "isomorphic-fetch";

export default function (method, api, params) {
  const headers = new Headers({
    authorization : `Bearer fb67d945-4bf2-4597-8cb8-b581b02f63c6`,
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
