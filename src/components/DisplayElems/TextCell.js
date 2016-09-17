import React from "react";
import styles from "./common.less";

export const TextCell = ({ value }) =>
  <div className={styles.alignLeft}>
    <span>{value}</span>
    {!value && <span>null</span>}
  </div>;

TextCell.propTypes = {
  value : React.PropTypes.string.isRequired,
};
