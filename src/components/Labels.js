import R from "ramda";
import React from "react";
import styles from "./_styles/common.less";

const isArray  = R.is(Array);
const isObj    = R.is(Object);
const isBool   = R.is(Boolean);
const isString = R.is(String);

const LabelsDOM      = ({ children }) => <span className={styles.labelCellTags}>{children}</span>;
const convertToReact = (val, key) => {
  if (isBool(val) && val) {
    return <LabelsDOM key={key}>{key}</LabelsDOM>;
  } else if (isArray(val) && (val.length !== 0)) {
    return <LabelsDOM key={key}>{key} : {val.toString()}</LabelsDOM>;
  } else if (isObj(val)) {
    return <LabelsDOM key={key}>{key} : {val.label}</LabelsDOM>;
  } else if (isString(val)) {
    return <LabelsDOM key={key}>{key} : <span>{val}</span></LabelsDOM>;
  }
  return null;
};
const labelize       = R.compose(R.values, R.mapObjIndexed(convertToReact));

const Labels = ({ value }) =>
  <div className={styles.alignLeft}>
    {labelize(value)}
  </div>;

Labels.propTypes = {
  value : React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};
export default Labels;
