import { isNonZeroArray, compose, find, map, concat, values, propEq, prop, reduce, keys } from "utils";
import componentsHash from "../componentsHash";

export const calcColWidths = (spec, data) => {
  if (!(isNonZeroArray(spec) && isNonZeroArray(keys(data)))) return {};
  const fieldNames = map(prop("fieldName"), spec);

  const colWidthArray = reduce((obj, name) => {
    const field              = find(propEq("fieldName", name), spec);
    const fieldType          = prop("fieldType", field);
    const getSize            = componentsHash[fieldType].size;
    const getFieldValue      = dat => getSize(prop(name, dat));
    const getDisplayNameSize = compose(getSize, prop("displayName"))(field);

    obj[name] = compose(values, map(getFieldValue))(data);
    obj[name] = concat(obj[name], [getDisplayNameSize]);

    return obj;
  }, {}, fieldNames);
  return map(colWidthObj => Math.max.apply(null, colWidthObj), colWidthArray);
};
