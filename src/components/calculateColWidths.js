/**
 * Created by sharavan on 30/08/16.
 */
import _ from "underscore";
import moment from "moment";

const checkIfDate = (val) => moment(val, moment.ISO_8601, true).isValid();

const sizer = (colData) => {
  let size = 0;
  const arbitraryWidth = 8;

  _.forEach(colData, val => {
    if (checkIfDate(val)) {
      size = 120;
    } else if (typeof val === "number") {
      size = Math.max(size, val.toString().length * arbitraryWidth + 20);
    } else if (typeof val === "string") {
      size = Math.max(size, val.length * arbitraryWidth + 30);
    } else {
      size = 100;
    }
  });

  if (size <= 100) size = 100;
  return size;
};

const calculateColWidths = (titleCol, dataCol) => {
  const objArray = {};
  const objWithSizes = {};

  _.forEach(dataCol, dataSet => {
    _.forEach(dataSet, (val, key) => {
      if ((key !== "id") && (key !== "__v")) {
        if (!(key in objArray)) objArray[key] = [];
        objArray[key].push(val);
      }
    });
  });

  _.forEach(titleCol, titleObj => {
    const key = titleObj.fieldName;
    if (!(key in objArray)) objArray[key] = [];
    objArray[key].push(key);
  });

  _.forEach(objArray, (col, key) => {
    objWithSizes[key] = sizer(col);
  });

  return objWithSizes;
};

export default calculateColWidths;
