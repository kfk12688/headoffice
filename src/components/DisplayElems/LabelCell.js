import React from "react";
import _ from "underscore";
import styles from "./common.less";

export const LabelCell = ({ value: array }) => {
  const labels = _.map(array, (val, key) => {

    if (typeof val === "boolean") {
      return <span key={key} className={styles.labelCellTags}>{key}</span>;
    }

    if (Array.isArray(val)) {
      if (val.length !== 0) {
        return <span key={key} className={styles.labelCellTags}>{key} : {val.toString()}</span>;
      }
      return null;
    }

    if (!Array.isArray(val) && typeof val === "object") {
      return <span key={key} className={styles.labelCellTags}>{key} : {val.label}</span>;
    }

    return <span key={key} className={styles.labelCellTags}>{key} : <span>{val}</span></span>;
  });

  return (<div className={styles.alignLeft}>
    {labels}
  </div>);
};

LabelCell.propTypes = {
  value : React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]),
};
