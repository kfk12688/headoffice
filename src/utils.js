import R from "ramda";
import moment from "moment";

const isOfType       = t => R.is(t);
const convertToArray = ar => {
  if (R.is(Array, ar)) return ar;
  return [ar];
};
const setError       = R.assoc("error");
const select         = t => R.assoc("isSelected", true, t);
const deselect       = t => R.assoc("isSelected", false, t);

export const isString       = isOfType(String);
export const isNumber       = isOfType(Number);
export const isArray        = isOfType(Array);
export const isObject       = isOfType(Object);
export const isBool         = isOfType(Boolean);
export const isNonZeroArray = R.converge(R.and, [isArray, a => R.gt(R.length(a), 0)]);
export const isDefined      = R.compose(R.not, R.isNil);
export const isDate         = str => {
  const momentDate = moment(str, "D/M/YYYY");
  if (R.isNil(momentDate) || !momentDate.isValid()) return false;

  const validFormats = ["D/M/YYYY", "DD/MM/YYYY", "D/M/YY", "DD/MM/YY"];
  const exists       = f => R.indexOf(momentDate.format(f), str) >= 0;
  const isTrue       = v => isBool(v) && v === true;
  return R.any(isTrue, R.map(exists, validFormats));
};
export const toBytes        = R.curry((bytes, decimals) => {
  if (bytes === 0) return "0 Byte";

  const k     = 1000; // or 1024 for binary
  const dm    = decimals + 1 || 1;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i     = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedSizeString = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formattedSizeString} ${sizes[i]}`;
});
export const toDate         = R.curry((format, date) => {
  const formatString = format || "D MMM YYYY, HH:mm A";
  if (date) return moment.utc(date).local().format(formatString);
  return "";
});
export const toTitle        = R.compose(R.join(""), R.over(R.lensIndex(0), R.toUpper));

export const getFromURIFragment = queryString => {
  const params = {};
  const regex  = /([^&=]+)=([^&]*)/g;
  let m;
  while (m) {
    m                                = regex.exec(queryString);
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return params;
};
export const randomString       = len => {
  let text       = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
export const objectToURI        = obj => {
  const generateQueryString = R.addIndex(
    R.map,
    (key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  );
  return R.compose(R.join("&"), generateQueryString)(obj);
};
export const exec               = R.curry((fn, name) => fn(name));
export const execById           = R.curry((fn, name, id) => fn(name, id));
export const getSelectedKeys    = R.compose(R.keys, R.filter(R.prop("isSelected")));
export const imap               = R.curry((mapFn, data) => R.compose(R.values, R.mapObjIndexed(mapFn))(data));
export const padWithZeros       = (string, size) => {
  let retVal = "";
  if (!isString(string)) retVal = R.toString(string);
  while (retVal.length !== size) retVal = R.concat("0", retVal);
  return retVal;
};
export const round              = R.curry((numDigits, v) => {
  if (numDigits === 0) return Math.round(v);
  return Math.round(v * 10 * numDigits) / (10 * numDigits);
});
export const genReactKey        = str => R.compose(R.toLower, R.replace(/ /, ""), R.toString)(str);

/**
 * Reducer functions
 */
export const set               = R.curry((path, value, root, data) => {
  const mergedPaths = R.isNil(path) ?
                      convertToArray(root) :
                      R.concat(convertToArray(root), convertToArray(path));
  return R.assocPath(mergedPaths, value, data);
});
export const merge             = R.curry((pathOfObjectToMerge, mergeObject, data) => {
  const mergeTo    = R.prop(pathOfObjectToMerge, data);
  const mergedData = R.merge(mergeObject, mergeTo);
  return R.assocPath(convertToArray(pathOfObjectToMerge), mergedData, data);
});
export const unset             = R.curry((path, root, data) => {
  const mergedPaths = R.isNil(path) ?
                      convertToArray(root) :
                      R.concat(convertToArray(root), convertToArray(path));
  return R.dissocPath(mergedPaths, data);
});
export const loading           = set("isLoading", true);
export const loaded            = set("isLoading", false);
export const setMessage        = R.assoc("message");
export const setFailure        = (payload, state) => {
  const err = R.prop("err", payload) || R.prop("error", payload);

  return R.compose(
    setMessage(err.message),
    setError(err.stack),
    loaded("list"),
  )(state);
};
export const loadingCollection = R.curry((collectionName, state) => loading(collectionName)(state));

// Menu Reducer Functions
export const selectAll   = R.compose(R.assocPath(["list", "data"]), R.map(select));
export const deselectAll = R.compose(R.assocPath(["list", "data"]), R.map(deselect));
export const getProps    = R.curry((keys, o) => {
  const obj         = {};
  const assignToObj = R.curry((origObj, path) => {
    obj[R.head(path)] = R.path(path, origObj);
  });
  const splitKeys   = R.map(R.split("."), keys);
  R.forEach(assignToObj(o), splitKeys);
  return obj;
});

export const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type : mimeString });
};

export {
  isNil,
  isEmpty,
  length,
  is,
  assoc,
  assocPath,
  path,
  prop,
  propOr,
  propEq,
  props,
  compose,
  curry,
  values,
  mapObjIndexed,
  map,
  reduce,
  find,
  keys,
  concat,
  filter,
  omit,
  split,
  has,
} from "ramda";
