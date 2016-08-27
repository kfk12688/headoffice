import React from "react";
import _ from "underscore";
import styles from "./common.less";

export const LabelCell = ({ value: array }) => {
  const labels = _.map(array, (val, key) => {
    if (typeof val === "boolean") {
      return <span key={key} className={styles.labelCellTags}>{key}</span>;
    }
    return <span key={key} className={styles.labelCellTags}>{key} : <span>{val}</span></span>;
  });

  return (<div className={styles.alignLeft}>
    {labels}
  </div>);
};

LabelCell.propTypes = {
  value : React.PropTypes.oneOfType(
    React.PropTypes.object,
    React.PropTypes.array
  ),
};
