/**
 * Created by sharavan on 29/06/16.
 */
import "isomorphic-fetch";

export default function (method, api) {
  const settings = {
    method,
    cache : "default",
  };

  const req = new Request(api, settings);

  return fetch(req);
}
