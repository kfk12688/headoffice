import R from "ramda";

const convertToArray = ar => {
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
export const loadCollection = R.curry((collectionName, state) => {
  return R.compose(loading(collectionName), loading("list"))(state);
});

export const setError = R.assoc("error");
export const setMessage = R.assoc("message");
