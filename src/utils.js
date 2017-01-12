import R from "ramda";
import moment from "moment";

export const toBytes            = R.curry((bytes, decimals) => {
  if (bytes === 0) {
    return "0 Byte";
  }

  const k     = 1000; // or 1024 for binary
  const dm    = decimals + 1 || 1;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i     = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedSizeString = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formattedSizeString} ${sizes[i]}`;
});
export const toDate             = R.curry((format, date) => {
  const formatString = format || "D MMM YYYY, HH:mm";
  return moment.utc(date).format(formatString);
});
export const getFromURIFragment = (queryString) => {
  const params = {};
  const regex  = /([^&=]+)=([^&]*)/g;
  let m;
  while (m) {
    m                                = regex.exec(queryString);
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return params;
};
export const randomString       = (length) => {
  let text       = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
export const objectToURI        = (obj) => {
  const generateQueryString = R.addIndex(
    R.map,
    (key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  );
  return R.compose(R.join("&"), generateQueryString)(obj);
};

// Reducer functions
const convertToArray        = ar => {
  if (R.is(Array, ar)) return ar;
  return [ar];
};
export const set            = R.curry((path, value, root, data) => {
  const mergedPaths = R.isNil(path) ?
                      convertToArray(root) :
                      R.concat(convertToArray(root), convertToArray(path));
  return R.assocPath(mergedPaths, value, data);
});
export const unset          = R.curry((path, root, data) => {
  const mergedPaths = R.isNil(path) ?
                      convertToArray(root) :
                      R.concat(convertToArray(root), convertToArray(path));
  return R.dissocPath(mergedPaths, data);
});
export const loading        = set("isLoading", true);
export const loaded         = set("isLoading", false);
export const setError       = R.assoc("error");
export const setMessage     = R.assoc("message");
export const loadCollection = R.curry((collectionName, state) =>
  R.compose(
    loading(collectionName),
    loading("list"),
  )(state)
);
