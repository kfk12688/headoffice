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
export const loadState      = set("isLoading", true);
export const loadedState    = set("isLoading", false);
export const loadCollection = R.curry((collectionName, state) => {
  return R.compose(loadState(collectionName), loadState("list"))(state);
});
