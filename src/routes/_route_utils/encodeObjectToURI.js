/**
 * Converts obj to an encoded URI string
 * @param obj
 * @returns {string}
 */
function toQueryString(obj) {
  const parts = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const key = encodeURIComponent(prop);
      const value = encodeURIComponent(obj[prop]);
      parts.push(`${key}=${value}`);
    }
  }
  return parts.join("&");
}

export default toQueryString;
