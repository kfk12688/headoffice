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
    }

    size = 100;
  });

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

  _.forEach(objArray, (set, key) => {
    if (titleCol && titleCol[key]) {
      objArray[key].push(titleCol[key].displayText);
    }
  });

  _.forEach(objArray, (col, key) => {
    objWithSizes[key] = sizer(col);
  });

  return objWithSizes;
};

export default calculateColWidths;
