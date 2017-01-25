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
export const isEmpty        = R.isEmpty;
export const isDate         = str => {
  const momentDate = moment(str, "D/M/YYYY");
  if (R.isNil(momentDate) || !momentDate.isValid()) return false;

  const validFormats = ["D/M/YYYY", "DD/MM/YYYY", "D/M/YY", "DD/MM/YY"];
  const exists       = f => R.indexOf(momentDate.format(f), str) >= 0
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
  return moment.utc(date).format(formatString);
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
export const randomString    = length => {
  let text       = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
export const objectToURI     = obj => {
  const generateQueryString = R.addIndex(
    R.map,
    (key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  );
  return R.compose(R.join("&"), generateQueryString)(obj);
};
export const exec            = R.curry((fn, name) => fn(name));
export const execById        = R.curry((fn, name, id) => fn(name, id));
export const getSelectedKeys = R.compose(R.keys, R.filter(R.path(["w"])));
export const imap            = R.curry((mapFn, data) => R.compose(R.values, R.mapObjIndexed(mapFn))(data));
export const padWithZeros    = (string, size) => {
  let retVal = "";
  if (!isString(string)) retVal = R.toString(string);
  while (retVal.length !== size) retVal = R.concat("0", retVal);
  return retVal;
};
const getSize                = data => {
  let size             = 0;
  const arbitraryWidth = 8;
  const compute        = val => {
    if (isString(val)) {
      size = Math.max(size, val.length * arbitraryWidth + 30);
    } else if (isDate(val)) {
      size = 250;
    } else if (isNumber(val)) {
      size = Math.max(size, val.toString().length * arbitraryWidth + 20);
    } else if (isObject(val)) {
      //size = Math.max(size, val.label.length * arbitraryWidth + 30);
      size = 250;
    }
  };

  if (isDefined(data)) {
    compute(data);
  }

  return size;
};
export const calcColWidths      = (spec, data) => {
  if (!(isNonZeroArray(spec) && isNonZeroArray(data))) return {};

  const o          = {};
  const fieldNames = R.map(R.prop("fieldName"), spec);

  R.forEach(name => {
    const getFieldValue = dat => getSize(R.prop(name, dat));

    o[name] = R.map(getFieldValue, data);
  }, fieldNames);

  return R.map(v => Math.max(...v, 100), o);
};
export const genReactKey        = str => R.compose(R.toLower, R.replace(/ /, ""), R.toString)(str);

/**
 * Reducer functions
 */
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
export const setMessage     = R.assoc("message");
export const setFailure     = (err, state) => {
  return R.compose(
    setMessage(err.message),
    setError(err.stack),
    loaded("list"),
  )(state);
};
export const loadCollection = R.curry((collectionName, state) => {
  return R.compose(
    loading(collectionName),
    loading("list"),
  )(state)
});

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
