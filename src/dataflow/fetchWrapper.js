import "isomorphic-fetch";

const getIdToken = () => localStorage.getItem("id_token") || null;

export function cachedFetch(method, api, params) {
  const expiry = 2 * 60;    // 2 min default
  const token = getIdToken();
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
  const cacheKey = api;
  const cached = localStorage.getItem(cacheKey);
  const whenCached = localStorage.getItem(`${cacheKey}:ts`);

  if (cached !== null && whenCached !== null) {
    const age = (Date.now() - whenCached) / 1000;
    if (age < expiry) {
      const response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    }

    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}:ts`);
  }

  return fetch(req)
    .then(response => {
      if (response.ok) {
        const ct = response.headers.get("Content-Type");
        if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
          response
            .clone()
            .text()
            .then(content => {
              localStorage.setItem(cacheKey, content);
              localStorage.setItem(`${cacheKey}:ts`, Date.now());
            });
        }
        return Promise.resolve(response);
      }
      const error = new Error(response.statusText || response.status);
      error.response = response;
      return Promise.reject(error);
    });
}

export default function (method, api, params) {
  const token = getIdToken();
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
  return fetch(req)
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      return response.json().then(err => Promise.reject(err));
    });
}
