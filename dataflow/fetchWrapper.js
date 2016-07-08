import "isomorphic-fetch";

export default function (method, token, api, params) {
  const headers = new Headers({
    "authorization" : `Bearer ${token}`,
  });

  let settings = {
    headers,
    method,
    headers,
    cache : "default",
    mode: "same-origin"
  };

  if (method === "POST") {
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
