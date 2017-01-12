import R from "ramda";
import React from "react";
import styles from "./_styles/common.less";

const isArray = R.is(Array);
const isObj   = R.is(Object);
const isBool  = R.is(Boolean);

const labelize  = R.map((val, key) => {
  if (isBool(val)) {
    return <LabelsDOM>{key}</LabelsDOM>
  } else if (isArray(val) && (val.length !== 0)) {
    return <LabelsDOM>{key} : {val.toString()}</LabelsDOM>;
  } else if (isObj(val)) {
    return <LabelsDOM>{key} : {val.label}</LabelsDOM>;
  }
  return <LabelsDOM>{key} : <span>{val}</span></LabelsDOM>;
});
const LabelsDOM = (children) => <span className={styles.labelCellTags}>{children}</span>
const Labels    = ({ value }) =>
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
